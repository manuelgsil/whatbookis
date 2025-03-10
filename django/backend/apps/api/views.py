# backend/apps/api/views.py
from rest_framework import viewsets
from backend.apps.api.models import Libro
from backend.apps.api.serializers import LibroSerializer

class LibroViewSet(viewsets.ModelViewSet):
    queryset = Libro.objects.exclude(primer_parrafo_en__isnull=True).exclude(primer_parrafo_en="")
    serializer_class = LibroSerializer
