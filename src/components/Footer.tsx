import { Link } from "react-router-dom"
import { Facebook, Twitter, Instagram } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <img src="/src/assets/libro.png" alt="Whatbookis logo" className="h-8 w-auto mr-2" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">Whatbookis</span>
            </Link>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              © 2025 Whatbookis — Todos los derechos reservados
            </p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Enlaces rápidos
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/features"
                  className="text-base text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Características
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-base text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Acerca de
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-base text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Síguenos
            </h3>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                <span className="sr-only">Facebook</span>
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                <span className="sr-only">Twitter</span>
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                <span className="sr-only">Instagram</span>
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

