#prod
from .base import *
from os import getenv
from dotenv import load_dotenv
from urllib.parse import urlparse


ALLOWED_HOSTS = [
    'localhost',  # Para permitir peticiones desde tu máquina local
    '127.0.0.1',  # También para la IP local
    'your-app-name.onrender.com',  # Dominio en Render
    'your-app-name.vercel.app',    # Dominio en Vercel
    'whatbookis.onrender.com',     # El dominio que mencionaste
]
DEBUG = False

CORS_ALLOWED_ORIGINS = [
    "https://whatbookis.vercel.app",  # El dominio de tu frontend en Vercel
]
load_dotenv()  # Carga las variables de entorno desde un archivo .env
tmpPostgres = urlparse(os.getenv("DATABASE_URL"))

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': tmpPostgres.path[1:],  # Elimina la barra inicial
        'USER': tmpPostgres.username,
        'PASSWORD': tmpPostgres.password,
        'HOST': tmpPostgres.hostname,
        'PORT': tmpPostgres.port or 5432,
        'OPTIONS': {
            'sslmode': 'require',
            'options': f'endpoint={tmpPostgres.hostname.split(".")[0]}',  # Extrae el endpoint-id
        }
    }
}

# Seguridad en producción
""" SECURE_SSL_REDIRECT = False
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True """