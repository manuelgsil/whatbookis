"use client"

import { LayoutMain } from "../layouts/LayoutMain"
import { GitlabIcon as GitHub, Linkedin, Mail } from "lucide-react"

export default function Contacto() {
  const contactMethods = [
    { name: "LinkedIn", icon: Linkedin, link: "https://www.linkedin.com/in/manuelguillensilva/", color: "bg-blue-600" },
    { name: "GitHub", icon: GitHub, link: "https://github.com/manuelgsil", color: "bg-gray-800" },
    { name: "Email", icon: Mail, link: "mailto:guillenmanuel993@gmail.com", color: "bg-red-500" },
  ]

  return (
    <LayoutMain>
      <section className="py-16 min-h-screen flex flex-col justify-center items-center text-foreground">
        <h1 className="text-4xl md:text-5xl font-semibold text-primary mb-8">¡Contáctame!</h1>

        <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-xl text-center mb-12">
          Si quieres saber más sobre el proyecto, colaborar, dar tu feedback o incluso, es más, si te apeteciera
          <span className="text-3xl font-bold text-primary block mt-2 shake ">
            ofrecerme un puesto de trabajo
          </span>
          <span className="text-lg text-muted-foreground mt-4 block">
            no dudes en usar todos los botones de abajo
          </span>
        </p>

        <div className="flex flex-wrap justify-center gap-8">
          {contactMethods.map((method) => (
            <a
              key={method.name}
              href={method.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center w-20 h-20 rounded-full ${method.color} text-white transition-transform transform hover:scale-125 hover:shadow-md`}
              aria-label={`Conéctate con ${method.name}`}
            >
              <method.icon size={32} />
            </a>
          ))}
        </div>

      </section>
    </LayoutMain>
  )
}
