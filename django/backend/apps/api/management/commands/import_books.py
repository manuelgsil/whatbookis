import asyncio
import requests
from django.core.management.base import BaseCommand
from backend.apps.api.models import Autor, Libro
from backend.apps.api.scraping.scraper import obtener_primer_parrafo_libro
from backend.apps.api.traduccion.translator import traducir_texto


class Command(BaseCommand):
    """
    Importa libros de autores clásicos desde la API de Gutendex y traduce el primer párrafo.
    """
    
    help = "Importa libros de autores clásicos desde la API de Gutendex y traduce el primer párrafo."

    # 📌 Lista de autores clásicos a buscar
    AUTORES_CLASICOS = [
        "homero", "virgilio", "dante alighieri", "geoffrey chaucer", "francisco de quevedo",
    "luis de góngora", "miguel de cervantes", "william shakespeare", "molière",
    
    # ✒️ Siglo XVIII y XIX  
    "goethe", "schiller", "mary shelley", "jane austen", "charlotte brontë", "emily brontë",
    "honoré de balzac", "victor hugo", "gustave flaubert", "charles dickens",
    "nathaniel hawthorne", "herman melville", "henry james", "mark twain",
    "ivan turgenev", "león tolstoi", "fiódor dostoievski", "emile zola", 
    "thomas hardy", "oscar wilde", "anton chéjov",

    # 🖋️ Siglo XX - Vanguardias y Modernismo  
    "marcel proust", "james joyce", "virginia woolf", "franz kafka", "william faulkner",
    "jorge luis borges", "adolfo bioy casares", "roberto arlt", "cesare pavese",
    "mikhail bulgakov", "hermann hesse", "thomas mann", "samuel beckett",
    "aldous huxley", "george orwell", "ray bradbury", "stanisław lem",

    # 🌎 Boom Latinoamericano y Contemporáneos  
    "gabriel garcía márquez", "mario vargas llosa", "julio cortázar", "carlos fuentes",
    "juan rulfo", "josé donoso", "manuel puig", "jorge amado", "josé saramago",
    "clarice lispector", "ernesto sábato", "eduardo galeano", "pablo neruda"
    ]

    # ───────────────────────────────────────────── #
    # 📌 MÉTODOS PRINCIPALES
    # ───────────────────────────────────────────── #

    def handle(self, *args, **kwargs):
        """Inicia la importación de libros."""
        self.stdout.write(self.style.NOTICE("🔄 Iniciando la importación de libros..."))
        
        ids_existentes = self.obtener_ids_existentes()  # 📂 Obtener libros ya existentes
        asyncio.run(self.importar_y_traducir_libros(ids_existentes))  # 🚀 Ejecutar la importación

        self.stdout.write(self.style.SUCCESS("✅ Importación finalizada."))

    def obtener_ids_existentes(self):
        """Obtiene todos los id_proyecto_gutenberg que ya existen en la base de datos."""
        self.stdout.write("📂 Cargando libros existentes en la base de datos...")
        ids = set(Libro.objects.values_list("id_proyecto_gutenberg", flat=True))
        self.stdout.write(f"🔍 {len(ids)} libros ya están en la base de datos.")
        return ids

    # ───────────────────────────────────────────── #
    # 📡 MÉTODOS DE OBTENCIÓN DE DATOS
    # ───────────────────────────────────────────── #

    async def importar_y_traducir_libros(self, ids_existentes):
        """Obtiene libros desde Gutendex y los almacena en la base de datos si no existen."""
        base_url = "https://gutendex.com/books"

        for autor in self.AUTORES_CLASICOS:
            self.stdout.write(f"\n📡 Buscando libros del autor: {autor.capitalize()}")

            params = {"search": autor, "languages": "en"}
            response = requests.get(base_url, params=params)

            if response.status_code != 200:
                self.stdout.write(self.style.ERROR(f"❌ Error al obtener datos de {autor}. Código: {response.status_code}"))
                continue

            libros = response.json().get("results", [])
            self.stdout.write(f"🔍 Se encontraron {len(libros)} libros para {autor}. Procesando hasta 3...")

            libros_nuevos = [
                book for book in libros[:3] 
                if book.get("id") not in ids_existentes and not self.contiene_biografia_o_poemas(book)
            ]

            if not libros_nuevos:
                self.stdout.write(f"  ⏩ Todos los libros de {autor} ya existen o son biografías/poemas. Saltando...\n")
                continue

            for book_data in libros_nuevos:
                await self.procesar_libro(book_data)

    def contiene_biografia_o_poemas(self, book_data):
        """Filtra libros que contienen 'biography' o 'poems' en el título o los temas."""
        titulo = book_data.get("title", "").lower()
        temas = [tema.lower() for tema in book_data.get("subjects", [])]

        if any(word in titulo for word in ["biography", "poems"]) or \
           any(word in tema for tema in temas for word in ["biography", "poems"]):
            self.stdout.write(f"  🔴 Libro '{titulo}' omitido por contener biografía o poemas.")
            return True

        return False

    # ───────────────────────────────────────────── #
    # 📖 MÉTODOS DE PROCESAMIENTO DE LIBROS
    # ───────────────────────────────────────────── #

    async def procesar_libro(self, book_data):
        """Procesa y guarda un libro en la base de datos."""
        book_id = book_data.get("id")
        titulo_original = book_data.get("title", "Desconocido")

        self.stdout.write(f"\n📖 Procesando libro: {titulo_original} (ID: {book_id})")

        # 🌍 Traducir título
        titulo_es = await self.translate_text(titulo_original)
        self.stdout.write(f"  ✅ Título traducido: {titulo_es}")

        # 📜 Obtener primer párrafo
        primer_parrafo_en = obtener_primer_parrafo_libro(book_data.get("formats", {}).get("text/html", ""))
        primer_parrafo_es = await self.translate_text(primer_parrafo_en) if primer_parrafo_en else None

        # ✍️ Procesar autores
        authors = [await self.create_or_update_author(author) for author in book_data.get("authors", [])]

        # 💾 Guardar libro
        await self.create_or_update_book(book_data, titulo_es, primer_parrafo_en, primer_parrafo_es, authors)

    async def create_or_update_book(self, book_data, titulo_es, primer_parrafo_en, primer_parrafo_es, authors):
        """Guarda el libro en la base de datos."""
        book_id = book_data.get("id")
        self.stdout.write(f"  💾 Guardando libro {book_id} en la base de datos...")

        try:
            book = await asyncio.to_thread(
                Libro.objects.create,
                id_proyecto_gutenberg=book_id,
                titulo=book_data.get("title"),
                titulo_es=titulo_es,
                temas=book_data.get("subjects"),
                idiomas=book_data.get("languages"),
                cantidad_descargas=book_data.get("download_count"),
                enlace=book_data.get("formats", {}).get("text/html", ""),
                primer_parrafo_en=primer_parrafo_en,
                primer_parrafo_es=primer_parrafo_es
            )
            await asyncio.to_thread(book.autores.set, authors)
            return book
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"  ❌ Error al guardar el libro {book_id}: {e}"))
            return None

    # ───────────────────────────────────────────── #
    # ✍️ MÉTODOS DE AUTORES
    # ───────────────────────────────────────────── #

    async def create_or_update_author(self, author_data):
        """Crea o actualiza un autor."""
        nombre = author_data.get("name")

        try:
            autor, _ = await asyncio.to_thread(
                Autor.objects.get_or_create,
                nombre=nombre,
                defaults={"nacimiento": author_data.get("birth_year"), "fallecimiento": author_data.get("death_year")}
            )
            return autor
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"  ❌ Error al guardar autor {nombre}: {e}"))
            return None

    # ───────────────────────────────────────────── #
    # 🌍 MÉTODOS DE TRADUCCIÓN
    # ───────────────────────────────────────────── #

    async def translate_text(self, text):
        """Traduce texto al español."""
        if not text:
            return None

        try:
            return await traducir_texto(text, src="en", dest="es")
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"  ❌ Error en la traducción: {e}"))
            return text

""" 📌 Resumen visual del flujo
1️⃣ handle → Inicia el proceso y obtiene libros existentes
2️⃣ importar_y_traducir_libros → Busca libros en Gutendex y filtra duplicados
3️⃣ procesar_libro → Traduce y extrae información relevante
4️⃣ create_or_update_book y create_or_update_author → Guarda libro y autores en la base de datos """