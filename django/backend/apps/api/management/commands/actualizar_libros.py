from django.core.management.base import BaseCommand
from backend.apps.api.models import Libro

class Command(BaseCommand):
    help = "Actualiza los campos titulo_IA y pista_IA de todos los libros, excluyendo aquellos cuyo título común es igual al título original"

    def handle(self, *args, **kwargs):
        # Diccionario con los libros y sus títulos IA (comunes más conocidos) y pistas IA
        libros_info = {
    "Tolstoi for the young: Select tales from Tolstoi": {
        "titulo_IA": "Tolstoi for the Young",
        "pista_IA": "Relatos moralizantes de un autor ruso, pensados para lectores jóvenes."
    },
    "The Journal of Leo Tolstoi (First Volume—1895-1899)": {
        "titulo_IA": "The Journal of Leo Tolstoi",
        "pista_IA": "Reflexiones privadas de un escritor que buscó el sentido de la vida."
    },
    "Bartleby, the Scrivener: A Story of Wall-Street": {
        "titulo_IA": "Bartleby, the Scrivener",
        "pista_IA": "Historia de un escribiente que responde siempre con 'Preferiría no hacerlo'."
    },
    "Moby-Dick; or, The Whale": {
        "titulo_IA": "Moby-Dick",
        "pista_IA": "La obsesión de un capitán por cazar una ballena blanca."
    },
    "A Simple Soul": {
        "titulo_IA": "A Simple Heart",
        "pista_IA": "Historia de una mujer humilde y su inquebrantable devoción."
    },
    "Sentimental Education; Or, The History of a Young Man. Volume 1": {
        "titulo_IA": "Sentimental Education",
        "pista_IA": "Crónica del desencanto de un joven en la sociedad francesa del siglo XIX."
    },
    "Letters of Two Brides": {
        "titulo_IA": "Letters of Two Brides",
        "pista_IA": "Dos amigas intercambian cartas sobre el amor y el matrimonio."
    },
    "Sarrasine": {
        "titulo_IA": "Sarrasine",
        "pista_IA": "Novela corta sobre un escultor enamorado de un secreto inesperado."
    },
    "Theresa Raquin": {
        "titulo_IA": "Thérèse Raquin",
        "pista_IA": "Una historia de amor, crimen y culpa en el París del siglo XIX."
    },
    "The dangerous inheritance : $b or, The mystery of the Tittani rubies": {
        "titulo_IA": "The Dangerous Inheritance",
        "pista_IA": "Un misterioso legado y unas gemas envueltas en peligro."
    },
    "Mosses from an old manse": {
        "titulo_IA": "Mosses from an Old Manse",
        "pista_IA": "Colección de relatos de un célebre autor estadounidense del siglo XIX."
    },
    "Twice-told tales": {
        "titulo_IA": "Twice-Told Tales",
        "pista_IA": "Cuentos melancólicos y góticos de un maestro de la literatura americana."
    },
    "Tess of the d'Urbervilles: A Pure Woman": {
        "titulo_IA": "Tess of the d'Urbervilles",
        "pista_IA": "Trágica historia de una joven y su lucha contra el destino y la moral victoriana."
    },
    "The Mayor of Casterbridge": {
        "titulo_IA": "The Mayor of Casterbridge",
        "pista_IA": "Un hombre que vende a su esposa en un arrebato y su lucha por la redención."
    },
    "Far from the Madding Crowd": {
        "titulo_IA": "Far from the Madding Crowd",
        "pista_IA": "Historia de una mujer independiente y sus pretendientes en la campiña inglesa."
    },
    "A Portrait of the Artist as a Young Man": {
        "titulo_IA": "A Portrait of the Artist as a Young Man",
        "pista_IA": "Autobiografía novelada de un joven irlandés en busca de su identidad artística."
    },
    "The Trial": {
        "titulo_IA": "The Trial",
        "pista_IA": "Un hombre es arrestado sin saber por qué en un mundo burocrático absurdo."
    },
    "The Metamorphosis": {
        "titulo_IA": "The Metamorphosis",
        "pista_IA": "Un hombre despierta convertido en un insecto y enfrenta el rechazo de su familia."
    },
    "Within a Budding Grove": {
        "titulo_IA": "Within a Budding Grove",
        "pista_IA": "Segunda parte de una monumental obra sobre la memoria y el tiempo."
    },
    "The Guermantes Way": {
        "titulo_IA": "The Guermantes Way",
        "pista_IA": "Un joven narrador se introduce en la alta sociedad francesa."
    },
    "The sound and the fury": {
        "titulo_IA": "The Sound and the Fury",
        "pista_IA": "Historia fragmentada sobre la caída de una familia sureña en EE.UU."
    },
    "Crome Yellow": {
        "titulo_IA": "Crome Yellow",
        "pista_IA": "Sátira de la sociedad británica en una casa de campo excéntrica."
    },
    "On the Margin: Notes and Essays": {
        "titulo_IA": "On the Margin",
        "pista_IA": "Colección de ensayos y reflexiones de un autor británico."
    },
    "Death in Venice": {
        "titulo_IA": "Death in Venice",
        "pista_IA": "Un escritor obsesionado con la belleza y la juventud en un viaje a Italia."
    },
    "Buddenbrooks, volume 1 of 2": {
        "titulo_IA": "Buddenbrooks",
        "pista_IA": "Crónica del declive de una familia burguesa alemana."
    },
    "The divine comedy": {
        "titulo_IA": "The Divine Comedy",
        "pista_IA": "Un viaje épico a través del Infierno, el Purgatorio y el Paraíso."
    },
    "Troilus and Criseyde": {
        "titulo_IA": "Troilus and Criseyde",
        "pista_IA": "Tragedia medieval sobre el amor y la traición en la guerra de Troya."
    },
    "Don Quixote, Volume 1": {
        "titulo_IA": "Don Quixote",
        "pista_IA": "Las desventuras de un hidalgo que cree ser caballero andante."
    },
    "Hamlet, Prince of Denmark": {
        "titulo_IA": "Hamlet",
        "pista_IA": "Un príncipe duda entre la venganza y la locura tras la muerte de su padre."
    },
    "Tartuffe; Or, The Hypocrite": {
        "titulo_IA": "Tartuffe",
        "pista_IA": "Una comedia satírica sobre la hipocresía religiosa."
    },
    "The Adventures of Tom Sawyer, Complete": {
        "titulo_IA": "The Adventures of Tom Sawyer",
        "pista_IA": "Las travesuras de un niño en el río Misisipi."
    },
    "Fathers and Sons": {
        "titulo_IA": "Fathers and Sons",
        "pista_IA": "Choque generacional entre idealismo y nihilismo en la Rusia del siglo XIX."
    },
    "Zero Hour": {
        "titulo_IA": "Zero Hour",
        "pista_IA": "Cuento de ciencia ficción sobre niños y una invasión alienígena."
    },
    "The Creatures That Time Forgot": {
        "titulo_IA": "The Creatures That Time Forgot",
        "pista_IA": "Sobrevivientes en un planeta donde el tiempo avanza de forma acelerada."
    },
    "Pillar of Fire": {
        "titulo_IA": "Pillar of Fire",
        "pista_IA": "Un hombre despierta en un mundo sin literatura ni emociones."
    },
    "Moby-Dick; or, The Whale": {
        "titulo_IA": "Moby-Dick",
        "pista_IA": "La obsesión de un capitán por cazar una ballena blanca."
    },
    "The dangerous inheritance : $b or, The mystery of the Tittani rubies": {
        "titulo_IA": "The Dangerous Inheritance",
        "pista_IA": "Un misterioso legado y unas gemas envueltas en peligro."
    },
    "British Popular Customs, Present and Past: Illustrating the Social and Domestic Manners of the People. Arranged According to the Calendar of the Year.": {
        "titulo_IA": "British Popular Customs",
        "pista_IA": "Compilación de costumbres y tradiciones británicas a lo largo del año."
    },
    "Demian": {
        "titulo_IA": "Demian",
        "pista_IA": "Un joven busca su identidad y la verdad más allá de las normas sociales."
    },
    "Siddhartha: A Poem of India": {
        "titulo_IA": "Siddhartha",
        "pista_IA": "El viaje espiritual de un hombre en busca de la iluminación."
    },
    "Monday or Tuesday": {
        "titulo_IA": "Monday or Tuesday",
        "pista_IA": "Colección de cuentos experimentales de una escritora modernista."
    },
    "The Voyage Out": {
        "titulo_IA": "The Voyage Out",
        "pista_IA": "La historia de una joven en su viaje de autodescubrimiento."
    },
    "Divine Comedy, Longfellow's Translation, Hell": {
        "titulo_IA": "The Divine Comedy: Inferno",
        "pista_IA": "Un poeta viaja a través del Infierno en busca de redención."
    },
    "The Divine Comedy of Dante Alighieri: The Inferno": {
        "titulo_IA": "The Divine Comedy: Inferno",
        "pista_IA": "Un poeta viaja a través del Infierno en busca de redención."
    },
    "Pablo de Segovia, the Spanish Sharper": {
        "titulo_IA": "The Life of Pablo de Segovia",
        "pista_IA": "Las aventuras de un pícaro español en el Siglo de Oro."
    },
    "The Visions of Quevedo": {
        "titulo_IA": "The Visions of Quevedo",
        "pista_IA": "Sátiras mordaces sobre la corrupción y los vicios de la sociedad."
    },
    "The Visions of Dom Francisco de Quevedo Villegas": {
        "titulo_IA": "The Visions of Quevedo",
        "pista_IA": "Sátiras mordaces sobre la corrupción y los vicios de la sociedad."
    },
    "The Imaginary Invalid": {
        "titulo_IA": "The Imaginary Invalid",
        "pista_IA": "Comedia sobre un hipocondríaco y su obsesión con la medicina."
    },
    "The Middle-Class Gentleman": {
        "titulo_IA": "The Bourgeois Gentleman",
        "pista_IA": "Un hombre intenta adoptar las costumbres de la aristocracia con resultados cómicos."
    },
    "Goethe's Theory of Colours": {
        "titulo_IA": "Theory of Colours",
        "pista_IA": "Un estudio filosófico sobre la naturaleza del color."
    },
    "Wilhelm Tell": {
        "titulo_IA": "William Tell",
        "pista_IA": "La leyenda de un arquero suizo que desafía a un tirano."
    },
    "The Robbers": {
        "titulo_IA": "The Robbers",
        "pista_IA": "Drama sobre el conflicto entre la justicia y la rebelión."
    },
    "Mary Stuart: A Tragedy": {
        "titulo_IA": "Mary Stuart",
        "pista_IA": "La trágica historia de la reina de Escocia y su destino fatal."
    },
    "Villette": {
        "titulo_IA": "Villette",
        "pista_IA": "La historia de una mujer que busca independencia y amor en el extranjero."
    },
    "Daisy Miller: A Study": {
        "titulo_IA": "Daisy Miller",
        "pista_IA": "Un retrato de una joven americana que desafía las normas sociales europeas."
    },
    "The Portrait of a Lady — Volume 1": {
        "titulo_IA": "The Portrait of a Lady",
        "pista_IA": "Una mujer enfrenta su destino entre la independencia y la sociedad europea."
    },
    "The Prince and the Pauper": {
        "titulo_IA": "The Prince and the Pauper",
        "pista_IA": "Dos niños idénticos intercambian lugares y viven realidades opuestas."
    },
    "First love, and other stories": {
        "titulo_IA": "First Love",
        "pista_IA": "Un joven experimenta su primer amor y el desencanto de la vida adulta."
    },
    "A Sportsman's Sketches, Volume 2: Works of Ivan Turgenev, Volume 2": {
        "titulo_IA": "A Sportsman’s Sketches",
        "pista_IA": "Relatos que capturan la vida rural y la injusticia en la Rusia del siglo XIX."
    },
    "Four Short Stories By Emile Zola": {
        "titulo_IA": "Four Short Stories by Zola",
        "pista_IA": "Pequeñas historias de realismo crudo y social."
    },
    "A Zola Dictionary; the Characters of the Rougon-Macquart Novels of Emile Zola;": {
        "titulo_IA": "A Zola Dictionary",
        "pista_IA": "Guía de personajes de la famosa serie de novelas de Zola."
    },
    "English Translations of Works of Emile Zola: An Index to the Project Gutenberg Works of Zola in English": {
        "titulo_IA": "Index of Zola’s Works",
        "pista_IA": "Listado de traducciones al inglés de las obras de un autor naturalista francés."
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
