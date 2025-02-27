import asyncio
from googletrans import Translator

# Función asincrónica para traducir el texto
async def traducir_texto(texto, src='en', dest='es'):
    """
    Traduce un texto de un idioma a otro utilizando la librería googletrans de forma asincrónica.
    
    :param texto: Texto a traducir.
    :param src: Idioma de origen (por defecto 'en' para inglés).
    :param dest: Idioma de destino (por defecto 'es' para español).
    :return: Texto traducido o None si falla la traducción.
    """
    translator = Translator()

    try:
        # Usar await para esperar la traducción de forma asincrónica
        resultado = await translator.translate(texto, src=src, dest=dest)
        return resultado.text
    except Exception as e:
        print(f"Error al traducir: {e}")
        return None
