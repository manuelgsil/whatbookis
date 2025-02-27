"use client"

import { useState, useEffect } from "react"
import { fetchBooks } from "../services/fetchBooks"
import type { Book as BookInterface } from "../models/types"
import { ArrowRight, BookOpen, Heart, Star, Clock, Lock } from "lucide-react"

const normalizeText = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .trim()
}

const isTitleMatch = (input: string, correctTitle: string) => {
  return normalizeText(input) === normalizeText(correctTitle)
}

export default function Book() {
  const [books, setBooks] = useState<BookInterface[]>([])
  const [currentBook, setCurrentBook] = useState<BookInterface | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showBook, setShowBook] = useState(false)
  const [titleGuess, setTitleGuess] = useState("")
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [attempts, setAttempts] = useState(0)
  const [correctGuesses, setCorrectGuesses] = useState(0)
  const [lives, setLives] = useState(3)
  const [unlockedClues, setUnlockedClues] = useState<boolean[]>([false, false, false])

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const booksData = await fetchBooks()
        setBooks(booksData)
      } catch (err) {
        setError("Error fetching books")
      } finally {
        setLoading(false)
      }
    }

    loadBooks()
  }, [])

  const handleButtonClick = () => {
    if (books.length > 0) {
      const randomBook = books[Math.floor(Math.random() * books.length)]
      setCurrentBook(randomBook)
      setShowBook(true)
      setIsCorrect(null)
      setTitleGuess("")
      setAttempts(0)
      setUnlockedClues([false, false, false])
    }
  }

  const handleGuess = () => {
    if (currentBook) {
      if (isTitleMatch(titleGuess, currentBook.titulo)) {
        setIsCorrect(true)
        setCorrectGuesses((prev) => prev + 1)
      } else {
        setIsCorrect(false)
        setAttempts((prevAttempts) => prevAttempts + 1)
        setLives((prevLives) => prevLives - 1)
      }
    }
  }

  const handleNext = () => {
    if (correctGuesses < 5) {
      const randomBook = books[Math.floor(Math.random() * books.length)]
      setCurrentBook(randomBook)
      setTitleGuess("")
      setIsCorrect(null)
      setAttempts(0)
      setUnlockedClues([false, false, false])
    }
  }

  const resetGame = () => {
    setAttempts(0)
    setShowBook(false)
    setTitleGuess("")
    setIsCorrect(null)
    setCorrectGuesses(0)
    setLives(3)
    setUnlockedClues([false, false, false])
  }

  const unlockClue = (index: number) => {
    setUnlockedClues((prev) => {
      const newUnlockedClues = [...prev]
      newUnlockedClues[index] = true
      return newUnlockedClues
    })
  }

  useEffect(() => {
    if (lives === 0) {
      alert("Game Over! You've run out of lives. Starting a new game.")
      resetGame()
    }
    if (correctGuesses >= 5) {
      alert("¡Felicidades! Has alcanzado el máximo de aciertos.")
      resetGame()
    }
  }, [lives, correctGuesses])

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <button
        onClick={handleButtonClick}
        className="w-full mb-8 px-6 py-3 bg-purple-600 text-white text-lg font-semibold rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
      >
        <BookOpen className="mr-2" />
        Libro aleatorio
      </button>
      {showBook && currentBook && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Paragraph Column */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-purple-400">Párrafo del libro</h2>
            <p className="text-gray-300 leading-relaxed">
              {currentBook.primerParrafoEn || "No content available for this book."}
            </p>
            <p>{currentBook.titulo}</p>
          </div>

          {/* Answer and Lives Column */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-purple-400">Adivina el título</h2>
            <div className="space-y-4">
              <input
                type="text"
                value={titleGuess}
                onChange={(e) => setTitleGuess(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white"
                placeholder="Escribe el título"
              />
              <button
                onClick={handleGuess}
                className="w-full px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
              >
                <ArrowRight className="mr-2" />
                Comprobar
              </button>
              {isCorrect !== null && (
                <p className={`text-lg font-semibold mt-4 ${isCorrect ? "text-green-400" : "text-red-400"}`}>
                  {isCorrect ? "¡Correcto! 🎉" : "Incorrecto. Intenta de nuevo."}
                </p>
              )}
              {isCorrect && correctGuesses < 5 && (
                <button
                  onClick={handleNext}
                  className="w-full px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors mt-4"
                >
                  Siguiente
                </button>
              )}
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center">
                  <Heart className="text-red-500 mr-2" />
                  <span className="text-xl font-bold">{lives}</span>
                </div>
                <div className="flex items-center">
                  <Star className="text-yellow-500 mr-2" />
                  <span className="text-xl font-bold">{correctGuesses}/5</span>
                </div>
                <div className="flex items-center">
                  <Clock className="text-blue-500 mr-2" />
                  <span className="text-xl font-bold">{attempts}/3</span>
                </div>
              </div>
            </div>
          </div>

          {/* Clue Boxes */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[ 
              { title: "Nombre del autor", value: currentBook.autores.map((author) => author.nombre || "Desconocido").join(", ") },
              { title: "Fecha de nacimiento", value: currentBook.autores.map((author) => author.nacimiento || "Desconocido").join(", ") },
              { title: "Género", value: currentBook.temas || "Desconocido" },
            ].map((clue, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-2 text-yellow-400">Pista {index + 1}</h3>
                {unlockedClues[index] ? (
                  <p className="text-gray-300">
                    {clue.title}: {clue.value}
                  </p>
                ) : (
                  <button
                    onClick={() => unlockClue(index)}
                    className="w-full px-4 py-2 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center"
                  >
                    <Lock className="mr-2" />
                    Desbloquear pista
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {error && <div className="mt-8 p-4 bg-red-900 text-red-200 border border-red-700 rounded-lg">{error}</div>}
      {loading && <p className="mt-8 text-lg text-gray-300">Loading books...</p>}
    </div>
  )
}
