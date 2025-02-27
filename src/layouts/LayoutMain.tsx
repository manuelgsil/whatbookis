import Header from "../components/Header"
import Hero from "../components/Hero"
import Footer from "../components/Footer"

export function LayoutMain() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
      </main>
      <Footer />
    </div>
  )
}

