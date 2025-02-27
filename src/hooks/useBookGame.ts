import { useState, useEffect } from "react"
import { fetchBooks } from "../services/fetchBooks"
import type { Book as BookInterface } from "../models/types"

const normalizeText = (text: string) => {
  return text.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, "").trim()
}

const isTitleMatch = (input: string, correctTitle: string) => {
  return normalizeText(input) === normalizeText(correctTitle)
}

export const useBookGame = () => {
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
      if (isTitleMatch(titleGuess, currentBook.title)) {
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
      alert("Game Over! Has perdido todas tus vidas. Reiniciando...")
      resetGame()
    }
    if (correctGuesses >= 5) {
      alert("¡Felicidades! Has alcanzado el máximo de aciertos.")
      resetGame()
    }
  }, [lives, correctGuesses])

  return {
    currentBook,
    showBook,
    titleGuess,
    isCorrect,
    attempts,
    correctGuesses,
    lives,
    unlockedClues,
    loading,
    error,
    handleButtonClick,
    handleGuess,
    handleNext,
    resetGame,
    unlockClue,
    setTitleGuess
  }
}
