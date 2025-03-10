import os
from dotenv import load_dotenv  # Importa la función para cargar .env
import sys

def main():
    # Cargar variables de entorno desde .env
    load_dotenv()

    # Obtener la configuración de Django desde las variables de entorno
    settings_module = os.getenv("DJANGO_SETTINGS_MODULE", "backend.settings.dev")
    
    print("\n" + "="*50)
    print(f"🔧  Cargando configuración de Django")
    print("="*50)
    print(f"📌 Configuración utilizada: {settings_module}")
    print("="*50 + "\n")

    # Mostrar todas las variables de entorno cargadas
    print("🔧 Variables de entorno cargadas:\n")
    
    env_keys = ["DJANGO_SETTINGS_MODULE", "SECRET_KEY", "DEBUG", "DATABASE_URL", "ALLOWED_HOSTS"]
    
    for key in env_keys:
        value = os.getenv(key, "⚠️ No está definida")
        print(f"  ✅ {key}: {value}")

    print("\n" + "="*50 + "\n")

    # Establecer la configuración de Django
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", settings_module)

    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        print("❌ Error: No se pudo importar Django.")
        print("Asegúrate de que está instalado y disponible en PYTHONPATH.")
        print("¿Olvidaste activar el entorno virtual?\n")
        raise exc

    # Ejecutar Django con los argumentos proporcionados
    execute_from_command_line(sys.argv)


if __name__ == "__main__":
    main()
