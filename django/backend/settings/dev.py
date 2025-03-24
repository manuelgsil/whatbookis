from .base import *

DEBUG = True  # Activamos DEBUG en desarrollo

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # React en desarrollo (Vite)
]

# Django Debug Toolbar (opcional para debugging en local)
#INSTALLED_APPS += ["debug_toolbar"]
#MIDDLEWARE += ["debug_toolbar.middleware.DebugToolbarMiddleware"]