from rest_framework import serializers
from backend.apps.api.models import Autor, Libro
import re

class AutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Autor
        fields = ['nombre']

class LibroSerializer(serializers.ModelSerializer):
    autores = AutorSerializer(many=True)  # Serializamos los autores como una lista de objetos Autor

    class Meta:
        model = Libro
        fields = ['id', 'id_proyecto_gutenberg', 'titulo', 'cantidad_descargas', 'enlace', 'primer_parrafo_en', 'autores']

    def to_representation(self, instance):
        # Llamamos al método original para obtener la representación
        representation = super().to_representation(instance)
        
        # Limpiar el campo 'primer_parrafo_en' antes de enviarlo al frontend
        if 'primer_parrafo_en' in representation and representation['primer_parrafo_en']:
            # Limpiar saltos de línea, caracteres no imprimibles, y espacios innecesarios
            representation['primer_parrafo_en'] = self.limpiar_texto(representation['primer_parrafo_en'])

        return representation

    def limpiar_texto(self, value):
        # Reemplazar saltos de línea y retornos de carro innecesarios
        value = value.replace('\r\n', '\n').replace('\r', '')  # Limpiar saltos de línea y retornos de carro

        # Eliminar espacios en blanco al principio y final
        value = value.strip()

        # Reemplazar múltiples saltos de línea consecutivos por uno solo
        value = re.sub(r'(\n\s*){2,}', '\n', value)

        # Eliminar espacios extra entre las palabras
        value = ' '.join(value.split())

        # Eliminar caracteres no imprimibles
        value = ''.join(c for c in value if c.isprintable())

        # Reemplazar comillas tipográficas o caracteres especiales (si es necesario)
        value = value.replace('“', '"').replace('”', '"').replace('‘', "'").replace('’', "'")

        return value
