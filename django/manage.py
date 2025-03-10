import os
from dotenv import load_dotenv  # Importa la función para cargar .env
import sys

def main():
    # Cargar variables de entorno desde .env
    load_dotenv()

    # Obtener la configuración de Django desde las variables de entorno
    settings_module = os.getenv("DJANGO_SETTINGS_MODULE", "backend.settings.prod")
    
    # Imprimir la configuración cargada
    print(f"🔧 Cargando configuración: {settings_module}")  

    # Mostrar todas las variables de entorno cargadas
    print("\n🔧 Variables de entorno cargadas:")
    # Iterar sobre las variables de entorno y mostrar solo las que están en .env
    env_keys = ["DJANGO_SETTINGS_MODULE", "SECRET_KEY", "DEBUG", "DATABASE_URL", "ALLOWED_HOSTS"]
    for key in env_keys:
        value = os.getenv(key, "No está definida")
        print(f"{key}: {value}")
    
    # Establecer la configuración de Django
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", settings_module)

    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    
    execute_from_command_line(sys.argv)


if __name__ == "__main__":
    main()
