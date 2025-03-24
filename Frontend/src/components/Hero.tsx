import { Link } from "react-router-dom"

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="heading-1">
              <span className="block">Whatbookis</span>
              <span className="block text-primary">Adivina el libro</span>
            </h1>
            <p className="text-content text-xl">
              Desafía tu memoria y apreciación literaria adivinando libros basándote únicamente en su primer párrafo.
            </p>
            <div className="flex flex-row sm:flex-row gap-4 justify-center">
              <Link to="/quiz" className="btn-primary inline-flex items-center">
                Juguemos
              </Link>
            </div>
            <p className="text-content text-gray-500 mt-4">
              ⚠️ Nota: Esta aplicación se conecta a un servicio gratuito en Render, por lo que puede tardar en cargar los libros.
              Si ves que la carga es lenta, intenta <strong>refrescar la página</strong>. Por otro lado,
              recomendamos una lectura ligera de cómo está estrucutrado el proyecto ya que hay ciertas
              peculiaridades a la hora tratar de acertar el título de un libro. 
              Más detalles en  <br />
              <Link to="/caracteristicas" className="text-primary underline">
                características
              </Link>.
            </p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full filter blur-3xl opacity-60 animate-blob"></div>
            <img
              className="relative"
              src="images/books-and-people.svg"
              alt="Persona leyendo libros"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
