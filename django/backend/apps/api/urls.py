# backend/apps/api/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LibroViewSet

# Crea un enrutador y registra el viewset de Libro
router = DefaultRouter()
router.register(r'libros', LibroViewSet, basename='libro')

urlpatterns = [
    path('', include(router.urls)),  # Registra las rutas de la API
]
