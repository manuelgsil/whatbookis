import json
from django.core.management.base import BaseCommand
from backend.apps.api.models import Autor, Libro

class Command(BaseCommand):
    help = "Exportar datos de Autor y Libro en UTF-8"

    def handle(self, *args, **options):
        # Obtener todos los autores y libros
        autores = Autor.objects.all()
        libros = Libro.objects.all()

        # Serializar los datos
        data = []
        for autor in autores:
            data.append({
                "model": "api.autor",
                "pk": autor.pk,
                "fields": {
                    "nombre": autor.nombre,
                    "nacimiento": autor.nacimiento,
                    "fallecimiento": autor.fallecimiento
                }
            })

        for libro in libros:
            data.append({
                "model": "api.libro",
                "pk": libro.pk,
                "fields": {
                    "id_proyecto_gutenberg": libro.id_proyecto_gutenberg,
                    "titulo": libro.titulo,
                    "titulo_es": libro.titulo_es,
                    "titulo_IA": libro.titulo_IA,
                    "pista_IA": libro.pista_IA,
                    "temas": libro.temas,
                    "autores": [autor.pk for autor in libro.autores.all()],
                    "idiomas": libro.idiomas,
                    "cantidad_descargas": libro.cantidad_descargas,
                    "enlace": libro.enlace,
                    "primer_parrafo_en": libro.primer_parrafo_en,
                    "primer_parrafo_es": libro.primer_parrafo_es
                }
            })

        # Guardar los datos en un archivo JSON con codificación UTF-8
        with open("datos.json", "w", encoding="utf-8") as file:
            json.dump(data, file, indent=4, ensure_ascii=False)

        self.stdout.write(self.style.SUCCESS("Datos exportados exitosamente a datos.json"))