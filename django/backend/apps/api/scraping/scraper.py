import re
from bs4 import BeautifulSoup
import requests

# Identificadores comunes (IDs y Clases)
identificadores_comunes = [
    "chapter_I", "chap01", "CHAPTER_I", "CHAPTER_1", "PART_I", "PART_1",
    "LETTER_1", "LETTER_I", "EPISODE_I", "STAVE_I", "MARLEY’S_GHOST", "#link2H_4_0001",
    "Playing_Pilgrims", "ACT_I", "I", "Chapter_I", "chapter-1", "#link2HCH0001", "pfirst",
    "chapter", "content", "section", "text", "entry"  # Agregamos posibles clases
]

# Expresión regular para detectar capítulos en enlaces <a>
regex_capitulos = re.compile(r'\b(LETTER\s1|LETTER\sI|CHAPTER\s1|CHAPTER\sI|EPISODE\s1|EPISODE\sI|PART\s1|PART\sI|STAVE\sI|MARLEY’S\sGHOST|Playing\sPilgrims|ACT\sI|I|Chapter\sI|chapter-1)\b', re.IGNORECASE)

def buscar_parrafo(soup, identificador, min_caracteres=100):
    """
    Busca el primer párrafo asociado a un identificador dado (puede ser ID o clase).
    
    Args:
        soup (BeautifulSoup): El objeto BeautifulSoup que contiene el HTML del libro.
        identificador (str): El identificador o clase del elemento HTML a buscar.
        min_caracteres (int): El número mínimo de caracteres que el párrafo debe tener para ser considerado.

    Returns:
        str: El primer párrafo encontrado asociado al identificador, o None si no se encuentra.
    """
    resultado = None  

    # Buscar por ID
    elemento = soup.find(id=identificador)
    
    # Si no se encuentra por ID, buscar por clase
    if not elemento:
        elemento = soup.find(class_=identificador)
    
    if elemento:
        parrafo = elemento.find_next('p')
        
        if parrafo:
            # Si el párrafo tiene la clase 'poem', obtener el siguiente párrafo
            if 'poem' in parrafo.get('class', []):
                parrafo = parrafo.find_next('p')
            
            # Si el párrafo tiene menos de 'min_caracteres', obtener el siguiente párrafo
            if len(parrafo.text.strip()) < min_caracteres:
                parrafo = parrafo.find_next('p')
            
            # Almacenar el resultado
            resultado = parrafo.text.strip() if parrafo else None
    
    return resultado

def buscar_parrafo_enlaces(soup):
    """
    Busca párrafos relevantes a partir de enlaces con la clase 'pginternal'.
    
    Args:
        soup (BeautifulSoup): El objeto BeautifulSoup que contiene el HTML del libro.

    Returns:
        str: El primer párrafo relevante encontrado en los enlaces con la clase 'pginternal', o None si no se encuentra.
    """
    resultado = None

    # Buscar en los enlaces con clase "pginternal"
    for enlace in soup.find_all('a', class_='pginternal'):
        if regex_capitulos.search(enlace.text) and enlace.get('href'):
            destino = enlace['href'].strip('#')
            resultado = buscar_parrafo(soup, destino)
            if resultado:
                break

    return resultado

def buscar_parrafo_encabezado(soup):
    """
    Busca párrafos relevantes a partir de encabezados <h2>.

    Args:
        soup (BeautifulSoup): El objeto BeautifulSoup que contiene el HTML del libro.

    Returns:
        str: El primer párrafo relevante encontrado después de un encabezado <h2>, o None si no se encuentra.
    """
    resultado = None

    # Buscar en los encabezados <h2>
    for encabezado in soup.find_all('h2'):
        if regex_capitulos.search(encabezado.text):
            parrafo = encabezado.find_next('p')
            if parrafo:
                resultado = parrafo.text.strip()
                break

    return resultado

def obtener_primer_parrafo_libro(url):
    """
    Obtiene el primer párrafo relevante de un libro dado su URL.

    Args:
        url (str): La URL del libro en formato HTML.

    Returns:
        str: El primer párrafo relevante encontrado, o None si no se encuentra ninguno.
    """
    try:
        response = requests.get(url)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')

        # 1️⃣ Primero, buscar por identificadores comunes (IDs y clases)
        resultado = None
        for identificador in identificadores_comunes:
            resultado = buscar_parrafo(soup, identificador)
            if resultado:
                break

        # 2️⃣ Si no se encontró, buscar en los enlaces con clase "pginternal"
        if not resultado:
            resultado = buscar_parrafo_enlaces(soup)

        # 3️⃣ Si no se encontró, intentar buscar párrafos después de encabezados <h2>
        if not resultado:
            resultado = buscar_parrafo_encabezado(soup)

        # 4️⃣ Si no se encontró ningún párrafo relevante, devolver None
        return resultado

    except requests.exceptions.RequestException as e:
        print(f"Error al procesar {url}: {e}")
        return None
