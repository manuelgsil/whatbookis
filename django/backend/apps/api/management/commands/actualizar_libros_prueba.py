from django.core.management.base import BaseCommand
from backend.apps.api.models import Libro

class Command(BaseCommand):
    help = "Actualiza los campos titulo_IA y pista_IA de todos los libros, excluyendo aquellos cuyo título común es igual al título original"

    def handle(self, *args, **kwargs):
        # Diccionario con los libros y sus títulos IA (comunes más conocidos) y pistas IA
        libros_info = {
    "Simple Sabotage Field Manual": {
        "titulo_IA": "Simple Sabotage Manual",
        "pista_IA": "Un manual de tácticas encubiertas creado para debilitar a enemigos en tiempos de guerra."
    },
    "Frankenstein; Or, The Modern Prometheus": {
        "titulo_IA": "Frankenstein",
        "pista_IA": "La historia de un científico obsesionado con desafiar los límites de la vida y la muerte."
    },
    "Moby Dick; Or, The Whale": {
        "titulo_IA": "Moby Dick",
        "pista_IA": "Un capitán obsesionado con la caza de una criatura marina legendaria."
    },
    "Romeo and Juliet": {
        "titulo_IA": "Romeo and Juliet",
        "pista_IA": "Una trágica historia de amor entre dos jóvenes de familias enemistadas."
    },
    "Pride and Prejudice": {
        "titulo_IA": "Pride and Prejudice",
        "pista_IA": "Una historia de amor y malentendidos en la alta sociedad inglesa."
    },
    "Alice's Adventures in Wonderland": {
        "titulo_IA": "Alice in Wonderland",
        "pista_IA": "Una niña cae en un mundo extraño lleno de personajes excéntricos y situaciones absurdas."
    },
    "The Complete Works of William Shakespeare": {
        "titulo_IA": "Shakespeare's Complete Works",
        "pista_IA": "La recopilación de obras de uno de los dramaturgos más influyentes de la historia."
    },
    "Middlemarch": {
        "titulo_IA": "Middlemarch",
        "pista_IA": "Un retrato de la sociedad victoriana a través de múltiples historias entrelazadas."
    },
    "Little Women; Or, Meg, Jo, Beth, and Amy": {
        "titulo_IA": "Little Women",
        "pista_IA": "Las vidas, sueños y desafíos de cuatro hermanas en la América del siglo XIX."
    },
    "A Room with a View": {
        "titulo_IA": "A Room with a View",
        "pista_IA": "Un viaje a Italia despierta en una joven inglesa el deseo de libertad y amor."
    },
    "The Great Gatsby": {
        "titulo_IA": "The Great Gatsby",
        "pista_IA": "Una historia de excesos, amor y desilusión en la era del jazz."
    },
    "A Doll's House : a play": {
        "titulo_IA": "A Doll's House",
        "pista_IA": "Una mujer desafía las normas sociales en busca de su independencia."
    },
    "The Blue Castle: a novel": {
        "titulo_IA": "The Blue Castle",
        "pista_IA": "Una mujer tímida decide cambiar su vida tras recibir una noticia impactante."
    },
    "The Enchanted April": {
        "titulo_IA": "The Enchanted April",
        "pista_IA": "Cuatro mujeres buscan renovación en un viaje primaveral a Italia."
    },
    "The Picture of Dorian Gray": {
        "titulo_IA": "The Picture of Dorian Gray",
        "pista_IA": "Un hombre intercambia su juventud eterna por un destino siniestro."
    },
    "Cranford": {
        "titulo_IA": "Cranford",
        "pista_IA": "Las historias cotidianas y entrañables de una pequeña comunidad inglesa."
    },
    "A Modest Proposal: For preventing the children of poor people in Ireland, from being a burden on their parents or country, and for making them beneficial to the publick": {
        "titulo_IA": "A Modest Proposal",
        "pista_IA": "Un irónico y mordaz ensayo que propone una 'solución' extrema para la pobreza."
    },
    "The Adventures of Ferdinand Count Fathom — Complete": {
        "titulo_IA": "Ferdinand Count Fathom",
        "pista_IA": "Las artimañas de un astuto estafador en busca de riqueza y estatus."
    },
    "The Expedition of Humphry Clinker": {
        "titulo_IA": "Humphry Clinker",
        "pista_IA": "Un viaje por Gran Bretaña contado a través de cartas de personajes variopintos."
    },
    "The Yellow Wallpaper": {
        "titulo_IA": "The Yellow Wallpaper",
        "pista_IA": "Un relato inquietante sobre una mujer atrapada por la opresión y la locura."
    },
    "History of Tom Jones, a Foundling": {
        "titulo_IA": "Tom Jones",
        "pista_IA": "Las aventuras y desventuras de un joven huérfano en la Inglaterra del siglo XVIII."
    },
    "The Adventures of Roderick Random": {
        "titulo_IA": "Roderick Random",
        "pista_IA": "Un joven aventurero enfrenta los altibajos de la fortuna en sus viajes."
    },
    "The Importance of Being Earnest: A Trivial Comedy for Serious People": {
        "titulo_IA": "The Importance of Being Earnest",
        "pista_IA": "Una comedia de enredos y dobles identidades en la sociedad victoriana."
    },
    "Twenty years after": {
        "titulo_IA": "Twenty Years After",
        "pista_IA": "Los famosos mosqueteros se reúnen para enfrentar nuevas intrigas políticas."
    },
    "The Strange Case of Dr. Jekyll and Mr. Hyde": {
        "titulo_IA": "Dr. Jekyll and Mr. Hyde",
        "pista_IA": "Un experimento divide a un hombre en dos personalidades opuestas."
    },
    "Dracula": {
        "titulo_IA": "Dracula",
        "pista_IA": "Un conde misterioso trae el terror desde los Cárpatos a Inglaterra."
    },
    "Crime and Punishment": {
        "titulo_IA": "Crime and Punishment",
        "pista_IA": "Un joven comete un crimen y es atormentado por la culpa y la redención."
    },
    "Metamorphosis": {
        "titulo_IA": "Metamorphosis",
        "pista_IA": "Un hombre despierta convertido en un extraño ser y enfrenta el rechazo de su familia."
    },
    "Adventures of Huckleberry Finn": {
        "titulo_IA": "Huckleberry Finn",
        "pista_IA": "Un chico rebelde viaja por el río Mississippi en busca de libertad."
    },
    "The Scarlet Letter": {
        "titulo_IA": "The Scarlet Letter",
        "pista_IA": "Una mujer marcada por la sociedad lucha por redimirse y criar a su hija."
    }
}

        # Filtrar solo los libros que no tienen pista_IA
        libros = Libro.objects.filter(pista_IA__isnull=True)

        # Función para limpiar los títulos (remover '$b' y otros fragmentos)
        def limpiar_titulo(titulo):
            return titulo.replace(" : $b", "").replace(" or,", "").strip()

        # Iterar sobre los libros que necesitan actualización
        for libro in libros:
            # Obtener el título del libro
            titulo_libro = libro.titulo

            # Limpiar el título original de la base de datos
            titulo_libro_limpio = limpiar_titulo(titulo_libro)

            # Si el libro tiene información de IA en el diccionario y el título IA está en los datos
            if titulo_libro_limpio in libros_info:
                libro_info = libros_info[titulo_libro_limpio]
                titulo_IA = libro_info["titulo_IA"]

                # Limpiar el título IA (si es necesario) para que se pueda comparar adecuadamente
                titulo_IA_limpio = limpiar_titulo(titulo_IA)

                # Verificar si el título original (limpio) es diferente del título IA (limpio)
                if titulo_libro_limpio != titulo_IA_limpio:
                    libro.titulo_IA = titulo_IA
                    libro.pista_IA = libro_info["pista_IA"]
                    libro.save()
                    self.stdout.write(self.style.SUCCESS(f"Libro '{titulo_libro}' actualizado con éxito."))
                else:
                    # Solo actualizar la pista_IA si el título no cambia
                    libro.pista_IA = libro_info["pista_IA"]
                    libro.save()
                    self.stdout.write(self.style.SUCCESS(f"Libro '{titulo_libro}' actualizado solo con la pista_IA."))
            else:
                self.stdout.write(self.style.WARNING(f"Libro '{titulo_libro}' no tiene información de IA disponible."))
