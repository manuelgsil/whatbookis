import Header from "../components/Header"
import Footer from "../components/Footer"
import { LayoutMainProps } from "../interfaces/types"

export function LayoutMain({ children }: LayoutMainProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">{children}</main> {/* Aquí renderizamos el contenido dinámico */}
      <Footer />
    </div>
  )
}
