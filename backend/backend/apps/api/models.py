from django.db import models

class Autor(models.Model):
    nombre = models.CharField(max_length=255)
    nacimiento = models.IntegerField(null=True, blank=True)
    fallecimiento = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.nombre

class Libro(models.Model):
    id_proyecto_gutenberg = models.IntegerField(unique=True)  # ID de Gutenberg
    titulo = models.CharField(max_length=500)
    temas = models.JSONField()  # Lista de temas
    autores = models.ManyToManyField(Autor, related_name="libros")
    idiomas = models.JSONField()  # Lista de idiomas
    formatos = models.JSONField()  # Diccionario con formatos de descarga
    cantidad_descargas = models.IntegerField()
    enlace = models.URLField()  # Enlace al libro
    
    # Campos adicionales para los párrafos que se completarán más tarde
    primer_parrafo_en = models.TextField(null=True, blank=True)  # Primer párrafo en inglés
    primer_parrafo_es = models.TextField(null=True, blank=True)  # Primer párrafo en español

    def __str__(self):
        return self.titulo
