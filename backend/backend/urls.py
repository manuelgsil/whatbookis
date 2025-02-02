# backend/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),  # Para el panel de administración
    path('api/', include('backend.apps.api.urls')),  # Para las rutas de la API
]
