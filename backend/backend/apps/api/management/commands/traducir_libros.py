from django.core.management.base import BaseCommand
from backend.apps.api.models import Libro
import asyncio
from backend.apps.api.traduccion.translator import traducir_texto
""" ESTE ARCHIVO NO SE USA """

class Command(BaseCommand):
    """
    Comando de gestión de Django para traducir los primeros párrafos de los libros 
    almacenados en inglés al español y actualizar el campo 'primer_parrafo_es' en la base de datos.
    """

    help = 'Traduce los primeros párrafos en inglés al español y los guarda en la base de datos'

    def handle(self, *args, **kwargs):
        """
        Método principal del comando. Recorre todos los libros en la base de datos con un primer párrafo en inglés,
        lo traduce al español usando la función 'traducir_texto()', y actualiza el campo 'primer_parrafo_es'.
        """
        libros_procesados = 0
        libros_sin_parrafo = []

        # Obtener todos los libros que tienen un párrafo en inglés
        libros = Libro.objects.exclude(primer_parrafo_en__isnull=True).exclude(primer_parrafo_en="")

        # Recorrer todos los libros y traducir los párrafos
        for libro in libros:
            texto_original = libro.primer_parrafo_en

            # Si ya tiene traducción, omitirlo
            if libro.primer_parrafo_es:
                self.stdout.write(f"  El libro '{libro.titulo}' ya tiene traducción. Omitiendo...")
                continue

            # Traducir el texto (llamada asincrónica)
            parrafo_traducido = asyncio.run(traducir_texto(texto_original, src='en', dest='es'))

            if parrafo_traducido:
                libro.primer_parrafo_es = parrafo_traducido
                libro.save()
                libros_procesados += 1
                self.stdout.write(f"  Traducción completada para el libro '{libro.titulo}'")
            else:
                self.stdout.write(f"  No se pudo traducir el párrafo de '{libro.titulo}'")
                libros_sin_parrafo.append(libro.titulo)

        # Mostrar resumen del proceso
        self.stdout.write("\nResumen del proceso:")
        self.stdout.write(f"  Libros traducidos: {libros_procesados}")
        if libros_sin_parrafo:
            self.stdout.write("  Libros sin traducción:")
            for titulo in libros_sin_parrafo:
                self.stdout.write(f"    {titulo}")
