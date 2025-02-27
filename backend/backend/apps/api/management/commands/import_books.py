import asyncio
from django.core.management.base import BaseCommand
import requests
from backend.apps.api.models import Autor, Libro
from backend.apps.api.scraping.scraper import obtener_primer_parrafo_libro
from backend.apps.api.traduccion.translator import traducir_texto
from asgiref.sync import sync_to_async

class Command(BaseCommand):
    """
    Comando para importar libros desde la API de Gutendex y traducir el primer párrafo.
    """
    help = 'Importa los libros desde la API de Gutendex y traduce el primer párrafo'

    def handle(self, *args, **kwargs):
        """
        Función principal que maneja el comando. Obtiene los libros desde la API de Gutendex, 
        los guarda en la base de datos y traduce el primer párrafo de cada libro.
        """
        asyncio.run(self.importar_y_traducir_libros())

    async def importar_y_traducir_libros(self):
        """
        Obtiene los libros desde la API de Gutendex y traduce sus primeros párrafos.
        """
        # URL de la API de Gutendex
        url = 'https://gutendex.com/books/?topic=classics&languages=en&sort=popular'
        response = requests.get(url)

        if response.status_code != 200:
            self.stdout.write(self.style.ERROR(f"Error al obtener datos de la API. Código: {response.status_code}"))
            return

        for book_data in response.json().get('results', []):
            # Traducir todo antes de crear el libro
            titulo_es = await self.translate_title(book_data.get('title', ''))
            
            # Obtener el primer párrafo en inglés y traducirlo
            primer_parrafo_en = obtener_primer_parrafo_libro(book_data.get('formats', {}).get('text/html', ''))
            if primer_parrafo_en:  # Solo traducir si hay un párrafo disponible
                primer_parrafo_es = await self.translate_first_paragraph(primer_parrafo_en)
            else:
                primer_parrafo_es = None
            
            # Crear o actualizar los autores
            authors = [await self.create_or_update_author(author) for author in book_data.get('authors', [])]
            
            # Crear o actualizar el libro con todos los datos, incluyendo el primer párrafo traducido
            book = await self.create_or_update_book(book_data, titulo_es, primer_parrafo_en, primer_parrafo_es, authors)

            msg = f"Libro '{book.titulo}' {'importado y traducido' if book.id else 'ya existía'}"
            self.stdout.write(self.style.SUCCESS(msg))

    @sync_to_async
    def create_or_update_book(self, book_data, titulo_es, primer_parrafo_en, primer_parrafo_es, authors):
        """
        Crea o actualiza un libro en la base de datos y asigna los autores al libro.
        """
        book, _ = Libro.objects.get_or_create(
            id_proyecto_gutenberg=book_data.get('id'),
            defaults={
                'titulo': book_data.get('title'),
                'titulo_es': titulo_es,
                'temas': book_data.get('subjects'),
                'idiomas': book_data.get('languages'),
                'cantidad_descargas': book_data.get('download_count'),
                'enlace': book_data.get('formats', {}).get('text/html', ''),
                'primer_parrafo_en': primer_parrafo_en,  # El primer párrafo en inglés
                'primer_parrafo_es': primer_parrafo_es  # El primer párrafo traducido
            }
        )
        book.autores.set(authors)
        book.save()  # Guarda el objeto libro después de actualizarlo
        return book

    @sync_to_async
    def create_or_update_author(self, author_data):
        """
        Crea o actualiza un autor en la base de datos.
        """
        autor, _ = Autor.objects.get_or_create(
            nombre=author_data.get('name'),
            defaults={
                'nacimiento': author_data.get('birth_year'),
                'fallecimiento': author_data.get('death_year')
            }
        )
        return autor

    async def translate_title(self, title):
        """
        Traduce el título del libro del inglés al español.
        """
        try:
            return await traducir_texto(title, src='en', dest='es')
        except Exception:
            return title

    async def translate_first_paragraph(self, primer_parrafo_en):
        """
        Traduce el primer párrafo del libro del inglés al español.
        """
        try:
            return await traducir_texto(primer_parrafo_en, src='en', dest='es')
        except Exception:
            return None
