import { LayoutMain } from "../layouts/LayoutMain"

const Caracteristicas = () => {
  return (
    <LayoutMain>
      <section className="min-h-screen flex items-center text-foreground py-6 sm:py-12">
        <div className="container flex flex-col mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mt-12 sm:mb-8">
            🛠️ Estado del Proyecto: Whatbookis
          </h2>

          <div className="max-w-3xl mx-auto bg-card p-6 rounded-lg shadow-lg space-y-6">
            {/* Estado del Proyecto */}
            <div className="text-left">
              <span className="font-medium text-primary">
                ⚠️ Este proyecto está en fase demo.
              </span>
              <p className="text-lg font-medium text-left mt-2">
                Algunas funcionalidades pueden no estar pulidas y la base de datos no está completamente optimizada.
              </p>
              <p className="text-lg font-medium text-left mt-2">
                ¡Aún así, puedes disfrutarlo y probar su mecánica de juego! 🎉
              </p>
            </div>

            {/* Explicación sobre cómo funciona el proyecto */}
            <div className="text-left space-y-4 mt-6">
              <h3 className="text-xl sm:text-2xl font-semibold text-primary mb-4">🔧 Cómo Funciona Whatbookis:</h3>
              <p className="text-lg font-medium">
                Whatbookis es un juego interactivo que permite a los usuarios adivinar libros a partir de su primer párrafo.
                El proyecto está desarrollado con Django en el backend y utiliza una API externa, Gutendex, para obtener
                libros de dominio público que se utilizan en el juego.
              </p>
              <p className="text-lg font-medium">
                A continuación, te explico cómo está estructurado el proyecto y cómo funciona:
              </p>

              <h4 className="text-lg font-semibold text-primary mt-4">🔹 Consumo de la API de Gutendex:</h4>
              <p className="text-lg font-medium">
                Desde el backend nos servimos de la API pública de Gutendex, que ofrece acceso a una amplia base de
                datos de libros de dominio público. A través de esta API, se recuperan libros que serán utilizados en el
                juego. La API devuelve los metadatos de los libros, como el título, autor y, un enlace que nos lleva al libro.
              </p>

              <h4 className="text-lg font-semibold text-primary mt-4">🔹 Preparación de Datos en el Backend:</h4>
              <p className="text-lg font-medium">
                El backend, desarrollado en Django, se encarga de realizar tareas de procesamiento de datos como el
                scraping y la recopilación de información adicional sobre los libros, como el primer párrafo.
                Además, prepara la base de datos que será utilizada por el frontend.
              </p>

              <h4 className="text-lg font-semibold text-primary mt-4">🔹 Servir el Endpoint al Frontend:</h4>
              <p className="text-lg font-medium">
                Una vez los datos están listos, el backend expone un endpoint en Django que permite al frontend acceder
                a los libros con la información que necesitamos. 
              </p>

              <h4 className="text-lg font-semibold text-primary mt-4">🔹 Lógica del Juego:</h4>
              <p className="text-lg font-medium">
                La lógica del juego en el frontend permite a los usuarios adivinar el libro basándose en el primer
                párrafo proporcionado. Además, se incluye un sistema de pistas que pueden ser desbloqueadas durante el
                juego para ayudar a los jugadores. El juego te proporciona 3 intentos y es
                completamente adaptable a los modos claro y oscuro.
              </p>
            </div>

            {/* Funcionalidades Actuales */}
            <div className="text-left space-y-4 mt-6">
              <h3 className="text-xl sm:text-2xl font-semibold text-primary mb-4">✅ Funcionalidades Actuales:</h3>
              <ul className="space-y-2">
                <li>🔹 Adivina libros basándote en su primer párrafo.</li>
                <li>🔹 Sistema de pistas desbloqueables para ayudarte.</li>
                <li>🔹 Vidas limitadas para hacer el reto más desafiante.</li>
                <li>🔹 Compatibilidad con modo oscuro y claro.</li>
                <li>🔹 Base de datos con una selección de libros (en crecimiento).</li>
              </ul>
            </div>

            {/* Mejoras Planeadas */}
            <div className="text-left space-y-4 mt-6">
              <h3 className="text-xl sm:text-2xl font-semibold text-destructive mb-4">🚧 Mejoras Planeadas:</h3>
              <ul className="space-y-2">
                <li>🔸 Acceder a otra API como Open Library o GoogleBooks que nos permita obtener una mayor cantidad de informacion.</li>
                <li>🔸 Sistema de puntuaciones y estadísticas personales.</li>
                <li>🔸 Modos de juego con diferentes niveles de dificultad.</li>
                <li>🔸 Selección de libros por géneros.</li>
                <li>🔸 Interfaz más pulida y animaciones mejoradas.</li>
              </ul>
            </div>

            {/* Cierre */}
            <p className="font-medium mt-6">
              🚀 <span className="text-primary">¡Gracias por probar Whatbookis!</span>
              <br />
              Tu feedback es muy valioso para mejorar este proyecto.
            </p>
          </div>
        </div>
      </section>
    </LayoutMain>
  )
}

export default Caracteristicas
