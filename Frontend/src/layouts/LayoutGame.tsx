import Book from "../components/Book/Book"
import Header from "../components/Header"
import Footer from "../components/Footer"

export function LayoutGame() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-muted">
        <div className="w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <Book />
        </div>
      </main>
      <Footer />
    </div>
  )
}

