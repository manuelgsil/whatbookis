"use client"

import { useState, useEffect, useCallback } from "react"
import { fetchBooks } from "../services/fetchBooks"
import type { Book as BookInterface } from "../interfaces/types"
import * as fuzzball from "fuzzball"
import leven from "leven"

const normalizeText = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .trim()
}

const isTitleMatch = (input: string, book: BookInterface) => {
  const normalizedInput = normalizeText(input)
  // Filtrar títulos que sean null o undefined
  const titles = [book.titulo, book.titulo_es, book.titulo_IA].filter((title): title is string => Boolean(title))
  return titles.some((title) => {
    const normalizedTitle = normalizeText(title)
    const similarity = fuzzball.ratio(normalizedInput, normalizedTitle)
    const editDistance = leven(normalizedInput, normalizedTitle)
    const maxAllowedDistance = Math.floor(normalizedTitle.length * 0.2) // Permite hasta un 20% de errores

    return similarity >= 80 || editDistance <= maxAllowedDistance
  })
}

export const useBookGame = () => {
  const [books, setBooks] = useState<BookInterface[]>([]);
  const [currentBook, setCurrentBook] = useState<BookInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showBook, setShowBook] = useState(false);
  const [titleGuess, setTitleGuess] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [correctGuesses, setCorrectGuesses] = useState(0);
  const [lives, setLives] = useState(3);
  const [unlockedClues, setUnlockedClues] = useState<boolean[]>([false, false, false]);
  const [unusedBooks, setUnusedBooks] = useState<BookInterface[]>([]);
  const [showTranslation, setShowTranslation] = useState(false);
  const [hasGuessedCorrectly, setHasGuessedCorrectly] = useState(false);
  const [isTitleVisible, setIsTitleVisible] = useState(false); // Estado para mostrar el título
  const [hasGivenUp, setHasGivenUp] = useState(false); // Nuevo estado para controlar si el usuario se ha rendido

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const booksData = await fetchBooks();
        setBooks(booksData);
        setUnusedBooks(booksData);
      } catch (err) {
        setError("Error fetching books");
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  const handleButtonClick = useCallback(() => {
    if (unusedBooks.length > 0) {
      const randomIndex = Math.floor(Math.random() * unusedBooks.length);
      const randomBook = unusedBooks[randomIndex];
      setCurrentBook(randomBook);
      setUnusedBooks((prevUnusedBooks) => prevUnusedBooks.filter((book) => book.titulo !== randomBook.titulo));
      setShowBook(true);
      setIsCorrect(null);
      setTitleGuess("");
      setUnlockedClues([false, false, false]);
      setIsTitleVisible(false); // Oculta el título al seleccionar un nuevo libro
      setHasGivenUp(false); // Resetea el estado de rendición para el nuevo libro
    } else {
      alert("¡Se han agotado los libros disponibles! Inicia una nueva partida.");
      resetGame();
    }
  }, [unusedBooks]);

  const handleGuess = useCallback(() => {
    if (currentBook && !hasGuessedCorrectly && !hasGivenUp) { // Verifica si no se ha rendido
      if (isTitleMatch(titleGuess, currentBook)) {
        setIsCorrect(true);
        setCorrectGuesses((prev) => prev + 1);
        setHasGuessedCorrectly(true);
      } else {
        setIsCorrect(false);
        setAttempts((prevAttempts) => prevAttempts + 1);
        setLives((prevLives) => prevLives - 1);
      }
    }
  }, [currentBook, titleGuess, hasGuessedCorrectly, hasGivenUp]);

  const handleNext = useCallback(() => {
    if (correctGuesses < 5) {
      handleButtonClick();
      setHasGuessedCorrectly(false);
    }
  }, [correctGuesses, handleButtonClick]);

  const resetGame = useCallback(() => {
    setAttempts(0);
    setShowBook(false);
    setTitleGuess("");
    setIsCorrect(null);
    setCorrectGuesses(0);
    setLives(10);
    setUnlockedClues([false, false, false]);
    setUnusedBooks(books);
    setHasGuessedCorrectly(false);
    setIsTitleVisible(false); // Resetea la visibilidad del título
    setHasGivenUp(false); // Resetea el estado de rendición
  }, [books]);

  const unlockClue = useCallback((index: number) => {
    setUnlockedClues((prev) => {
      const newUnlockedClues = [...prev];
      newUnlockedClues[index] = true;
      return newUnlockedClues;
    });
  }, []);

  const toggleTranslation = useCallback(() => {
    setShowTranslation((prev) => !prev);
  }, []);

  // Nueva función para rendirse
  const handleGiveUp = useCallback(() => {
    if (lives > 0 && !hasGivenUp) {
      setIsTitleVisible(true); // Muestra el título
      setLives((prevLives) => prevLives - 1); // Resta una vida
      setHasGivenUp(true); // Marca que el usuario se ha rendido
    }
  }, [lives, hasGivenUp]);

  return {
    books,
    currentBook,
    loading,
    error,
    showBook,
    titleGuess,
    setTitleGuess,
    isCorrect,
    attempts,
    correctGuesses,
    lives,
    unlockedClues,
    handleButtonClick,
    handleGuess,
    handleNext,
    resetGame,
    unlockClue,
    unusedBooks,
    showTranslation,
    toggleTranslation,
    isTitleVisible, // Exporta el estado del título
    hasGivenUp, // Exporta el estado de rendición
    handleGiveUp, // Exporta la función para rendirse
  };
};
