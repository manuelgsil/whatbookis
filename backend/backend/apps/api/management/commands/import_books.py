from django.core.management.base import BaseCommand
import requests
from backend.apps.api.models import Autor, Libro
from backend.apps.api.scraping.scraper import obtener_primer_parrafo_libro  # Importar la función de scraping

class Command(BaseCommand):
    help = 'Importa los libros desde la API de Gutendex'

    def handle(self, *args, **kwargs):
        url = 'https://gutendex.com/books'  # La URL de la API
        response = requests.get(url)
        
        if response.status_code == 200:
            data = response.json()
            books = data.get('results', [])
            
            for book_data in books:
                # Crear o actualizar los autores
                authors_data = book_data.get('authors', [])
                authors = []
                for author_data in authors_data:
                    author_name = author_data.get('name')
                    author_birth_year = author_data.get('birth_year')
                    author_death_year = author_data.get('death_year')
                    if author_name:
                        author, created = Autor.objects.get_or_create(
                            nombre=author_name,
                            defaults={'nacimiento': author_birth_year, 'fallecimiento': author_death_year}
                        )
                        authors.append(author)

                # Crear o actualizar el libro
                book, created = Libro.objects.get_or_create(
                    id_proyecto_gutenberg=book_data.get('id'),
                    defaults={
                        'titulo': book_data.get('title'),
                        'temas': book_data.get('subjects'),
                        'idiomas': book_data.get('languages'),
                        'formatos': book_data.get('formats'),
                        'cantidad_descargas': book_data.get('download_count'),
                        'enlace': book_data.get('formats', {}).get('text/html', ''),  # Enlace al libro
                    }
                )

                # Asignar autores al libro
                book.autores.set(authors)
                
                # Obtener el primer párrafo """ LO HICE MAL LA PRIMERA VEZ HAY QUE REHACER LA BD Y METERLO EN EL IDIOMA EN """
                primer_parrafo = obtener_primer_parrafo_libro(book.enlace)
                if primer_parrafo:
                    book.primer_parrafo_en = primer_parrafo 
                    book.save()

                book.save()

                if created:
                    self.stdout.write(self.style.SUCCESS(f"Libro '{book.titulo}' importado exitosamente"))
                else:
                    self.stdout.write(self.style.SUCCESS(f"Libro '{book.titulo}' ya existía"))
        else:
            self.stdout.write(self.style.ERROR(f"Error al obtener datos de la API. Código: {response.status_code}"))
