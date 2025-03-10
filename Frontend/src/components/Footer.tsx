import { Linkedin, Instagram } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-card">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex  justify-between items-center">
          <div className="w-full">
            <h3 className="heading-2 uppercase mb-4">Sígueme</h3>
            <div className="flex justify-center md:justify-center space-x-6">
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

