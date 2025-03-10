# backend/urls.py
from django.contrib import admin
from django.conf import settings
from django.urls import path, include
from . import views

urlpatterns = [
    path('', include('backend.apps.api.urls')),  # API en la raíz
    path('admin/', admin.site.urls),  # Para el panel de administración
]

# Si quieres habilitar debug_toolbar, descomenta este bloque:
# if settings.DEBUG:
#     import debug_toolbar
#     urlpatterns = [
#         path('__debug__/', include(debug_toolbar.urls)),
#     ] + urlpatterns
