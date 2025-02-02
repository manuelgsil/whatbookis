from django.core.management.base import BaseCommand
from backend.apps.api.models import Libro
from backend.apps.api.scraping.scraper import obtener_primer_parrafo_libro  # Importar la función de scraping

class Command(BaseCommand):
    """
    Comando de gestión de Django para extraer el primer párrafo de un libro desde su URL
    y actualizar el campo 'primer_parrafo_en' en la base de datos.

    Este comando recorre todos los libros en la base de datos, obtiene el primer párrafo
    relevante de cada libro a partir de su URL y lo almacena en el modelo de base de datos.

    La lógica de extracción del primer párrafo se maneja en el archivo 'scraper.py' dentro de la carpeta 'scraping'.
    
    Archivos relevantes:
    - Función utilizada: 
        - `obtener_primer_parrafo_libro(url)` en `backend/apps/api/scraping/scraper.py`
    - Modelo de libro:
        - `Libro` en `backend/apps/api/models.py`
    - Este comando de gestión:
        - `extract_paragraphs.py` en `backend/apps/api/management/commands/`
    
    Ejecución del comando:
        python manage.py extract_paragraphs
    """

    help = 'Extrae el primer párrafo de un libro y lo guarda en la base de datos'

    def handle(self, *args, **kwargs):
        """
        Método principal del comando de gestión. Recorre todos los libros en la base de datos,
        obtiene el primer párrafo relevante desde su URL utilizando la función 'obtener_primer_parrafo_libro()',
        y actualiza el campo 'primer_parrafo_en' en el modelo de libro.

        Si no se encuentra un párrafo relevante para algún libro, se registra y muestra al final
        una lista de libros que no pudieron ser procesados.

        Para obtener más detalles sobre la lógica de scraping, revisa el archivo 'scraper.py'.
        """
        libros_no_encontrados = []  # Para almacenar libros que no se pudieron procesar

        # Obtener todos los libros en la base de datos
        libros = Libro.objects.all()

        for libro in libros:
            url = libro.enlace  # Usamos el campo 'enlace' que ya tiene la URL

            # Si no tiene un enlace, continuar con el siguiente libro
            if not url:
                self.stdout.write(f"  No tiene un enlace válido para el libro {libro.titulo}.")
                continue

            # Obtener el primer párrafo relevante
            primer_parrafo = obtener_primer_parrafo_libro(url)
            
            if primer_parrafo:
                # Actualizar el campo 'primer_parrafo_en' con el primer párrafo
                libro.primer_parrafo_en = primer_parrafo
                libro.save()
                self.stdout.write(f"  Primer párrafo actualizado para el libro {libro.titulo}")
            else:
                self.stdout.write(f"  No se encontró un párrafo relevante para el libro {libro.titulo}")
                libros_no_encontrados.append(libro.titulo)

        # Mostrar los libros que no pudieron ser procesados
        if libros_no_encontrados:
            self.stdout.write("\nLibros no procesados:")
            for titulo in libros_no_encontrados:
                self.stdout.write(f"  {titulo}")
