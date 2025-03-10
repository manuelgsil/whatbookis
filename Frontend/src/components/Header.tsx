"use client"

import { Link } from "react-router-dom"
import { Menu, X, Moon, Sun } from "lucide-react"
import { useState, useEffect } from "react"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const toggleDarkMode = () => {
    // Cambia el estado del modo oscuro
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)

    // Guarda la preferencia en localStorage
    localStorage.setItem("darkMode", JSON.stringify(newDarkMode))

    // Cambia el modo oscuro en el documento
    if (newDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  // Detecta la preferencia de modo oscuro del usuario y la guarda en el estado
  useEffect(() => {
    // Intenta leer la preferencia del modo oscuro desde localStorage
    const savedDarkMode = localStorage.getItem("darkMode")
    
    if (savedDarkMode !== null) {
      // Si existe una preferencia guardada, la usa
      const darkModeSetting = JSON.parse(savedDarkMode)
      setIsDarkMode(darkModeSetting)

      // Aplica la clase correspondiente
      if (darkModeSetting) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    } else {
      // Si no hay preferencia guardada, detecta automáticamente el sistema
      const userPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setIsDarkMode(userPrefersDark)

      if (userPrefersDark) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }
  }, [])

  return (
    <header className="bg-card shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/inicio" className="flex-shrink-0 flex items-center">
              <img className="h-8 w-auto" src="images/libro.png" alt="Whatbookis logo" />
              <span className="ml-2 text-xl font-bold text-foreground">Whatbookis</span>
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <nav className="space-x-4">
              {["Inicio", "Caracteristicas", "Contacto"].map((item) => (
                <Link
                  key={item}
                  to={item === "Inicio" ? "/inicio" : `/${item.toLowerCase()}`}
                  className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <div className="sm:hidden ml-3">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {["Inicio", "Caracteristicas", "Contacto"].map((item) => (
              <Link
                key={item}
                to={item === "Inicio" ? "/" : `/${item.toLowerCase()}`}
                className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
