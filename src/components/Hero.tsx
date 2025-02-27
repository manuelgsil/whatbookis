import { Link } from "react-router-dom"
import { ArrowRight, BookOpen } from "lucide-react"

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-white to-gray-100 dark:from-slate-900 dark:to-slate-800 min-h-screen flex items-center">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              <span className="block">Whatbookis</span>
              <span className="block text-emerald-600">Adivina el libro</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Desafía tu memoria y apreciación literaria adivinando libros basándote únicamente en su primer párrafo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/quiz"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 transition duration-150 ease-in-out"
              >
                Juguemos
                <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-emerald-700 bg-emerald-100 hover:bg-emerald-200 transition duration-150 ease-in-out"
              >
                Más proyectos
                <BookOpen className="ml-2 -mr-1 h-5 w-5" />
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
            <img
              className="relative rounded-lg shadow-2xl"
              src="https://www.svgrepo.com/show/492789/books-and-people.svg"
              alt="Personas leyendo libros"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

