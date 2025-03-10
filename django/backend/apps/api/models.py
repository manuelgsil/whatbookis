from django.db import models

class Autor(models.Model):
    """
    Representa un autor con su nombre, año de nacimiento y fallecimiento (opcional).
    """
    nombre = models.CharField(max_length=255)
    nacimiento = models.IntegerField(null=True, blank=True)
    fallecimiento = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.nombre

class Libro(models.Model):
    """
    Modelo para almacenar información sobre libros del Proyecto Gutenberg.
    """
    id_proyecto_gutenberg = models.IntegerField(unique=True)
    titulo = models.CharField(max_length=500)
    titulo_es = models.CharField(max_length=255, null=True, blank=True)  
    titulo_IA = models.CharField(max_length=255, null=True, blank=True)  # Título generado por IA
    pista_IA = models.TextField(null=True, blank=True)  # Pista generada por IA para adivinar el título
    temas = models.JSONField()
    autores = models.ManyToManyField(Autor, related_name="libros")
    idiomas = models.JSONField()
    cantidad_descargas = models.IntegerField()
    enlace = models.URLField()

    # Campos adicionales para almacenar el primer párrafo en diferentes idiomas
    primer_parrafo_en = models.TextField(null=True, blank=True)
    primer_parrafo_es = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.titulo
