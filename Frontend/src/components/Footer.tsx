import { Link } from "react-router-dom"
import { Linkedin, Instagram } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-card shadow-sm py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="flex justify-center md:justify-start mb-4">
              <img src="images/libro.png" alt="Whatbookis logo" className="h-8 w-auto mr-2" />
              <span className="text-xl font-bold text-foreground">Whatbookis</span>
            </Link>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © 2025 Whatbookis <br /> Todos los derechos reservados
            </p>
          </div>

          {/* Quick Links (only visible on medium and larger screens) */}
          <div className="hidden md:block flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold uppercase mb-4 text-foreground">Enlaces rápidos</h3>
            <ul className="space-y-2 text-center md:text-left">
              {["Características", "Acerca de", "Contacto"].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className="text-base text-muted-foreground hover:text-foreground">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold uppercase mb-4 text-foreground">Sígueme</h3>
            <div className="flex space-x-6 justify-center md:justify-start">
              {[
                { name: "Instagram", icon: Instagram, url: "https://instagram.com/borntobetranquilito" },
                { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/manuelguillensilva/" }
              ].map((social) => (
                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                  <span className="sr-only">{social.name}</span>
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
