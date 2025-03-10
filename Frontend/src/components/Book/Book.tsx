import { useState, useEffect, useCallback } from "react"
import { BookOpen } from "lucide-react"
import { useBookGame } from "../../hooks/useBookGame"
import { BookParagraph } from "./Bookparagraph"
import { ClueBox } from "./Cluebox"
import { GameStats } from "./GameStats"
import { GuessInput } from "./GuessInput"
import { Modal } from "./Modal"

export default function Book() {
  const {
    currentBook,
    loading,
    error,
    showBook,
    titleGuess,
    setTitleGuess,
    isCorrect,
    correctGuesses,
    lives,
    unlockedClues,
    handleButtonClick,
    handleGuess,
    handleNext,
    unlockClue,
    unusedBooks,
    resetGame,
    showTranslation,
    toggleTranslation,
  } = useBookGame()

  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState("")

  const clues = currentBook
    ? [
        { title: "Temas", value: currentBook.temas?.join(", ") },
        { title: "Pista general", value: currentBook.pista_IA || null },
        { title: "Nombre del autor", value: currentBook.autores?.map((author) => author.nombre).join(", ") },
      ].filter((clue) => clue.value)
    : []

  const handleGameEndLocal = useCallback((message: string) => {
    setModalContent(message)
    setShowModal(true)
  }, [])

  useEffect(() => {
    if (lives === 0) {
      handleGameEndLocal("Has perdido. ¡Vuelve a intentarlo!")
    } else if (correctGuesses >= 3) {
      handleGameEndLocal("¡Felicidades! Has alcanzado el máximo de aciertos.")
    }
  }, [lives, correctGuesses, handleGameEndLocal])

  // Asegúrate de resetear las vidas, intentos, y aciertos cuando se selecciona un nuevo libro
  const handleNewBook = () => {
    resetGame()  // Resetea las estadísticas del juego (vidas, intentos, aciertos)
    handleButtonClick()  // Selecciona un nuevo libro aleatorio
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto px-4 py-8">
        <div className="flex justify-around items-center mb-8">
          <button onClick={handleNewBook} className="btn-primary flex items-center justify-center">
            <BookOpen className="mr-2" />
            Libro aleatorio
          </button>
          <span className="text-muted-foreground">Libros restantes: {unusedBooks.length}</span>
        </div>
        {showBook && currentBook && (
          
          <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BookParagraph
              contentEn={currentBook.primer_parrafo_en}
              contentEs={currentBook.primer_parrafo_es}
              showTranslation={showTranslation}
              toggleTranslation={toggleTranslation}
            />
            <div className="card self-center">
              <h2 className="heading-2 py-5 text-balance">Adivina el título: {currentBook.titulo}</h2>
              <GuessInput
                titleGuess={titleGuess}
                setTitleGuess={setTitleGuess}
                handleGuess={handleGuess}
                isCorrect={isCorrect}
              />
              {isCorrect && correctGuesses < 5 && (
                <button onClick={handleNext} className="btn-secondary w-full mt-4">
                  Siguiente
                </button>
              )}
              <GameStats lives={lives} correctGuesses={correctGuesses} />
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6 auto-rows-auto">
              {clues.map((clue, index) => (
                <ClueBox
                  key={index}
                  index={index}
                  title={clue.title}
                  value={clue.value || "desconocido"}
                  unlocked={unlockedClues[index]}
                  onUnlock={() => unlockClue(index)}
                />
              ))}
            </div>
          </div>
        )}
        {error && (
          <div className="mt-8 p-4 bg-destructive text-destructive-foreground border border-destructive rounded-lg">
            {error}
          </div>
        )}
        {loading && <p className="mt-8 text-lg text-muted-foreground">Cargando libros...</p>}
      </div>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          resetGame()
        }}
      >
        <h2 className="heading-2">{modalContent}</h2>
        <button
          onClick={() => {
            setShowModal(false)
            resetGame()
          }}
          className="btn-primary mt-4"
        >
          Jugar de nuevo
        </button>
      </Modal>
    </div>
  )
}
