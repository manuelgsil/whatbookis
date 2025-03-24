#prod
from .base import *
from os import getenv
from dotenv import load_dotenv
from urllib.parse import urlparse


ALLOWED_HOSTS = [
    'whatbookis.onrender.com',
    'whatbookis.vercel.app',
]

DEBUG = False

CORS_ALLOWED_ORIGINS = [
    "https://whatbookis.vercel.app"
    "http://localhost:5173",  
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

SECURE_SSL_REDIRECT = True  
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True 