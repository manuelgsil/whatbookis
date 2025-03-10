import React, { useState } from "react"
import { ArrowRight } from "lucide-react"

interface GuessInputProps {
  titleGuess: string
  setTitleGuess: (guess: string) => void
  handleGuess: () => void
  isCorrect: boolean | null
}

export const GuessInput: React.FC<GuessInputProps> = ({
  titleGuess,
  setTitleGuess,
  handleGuess,
  isCorrect,
}) => {
  const [emptyError, setEmptyError] = useState(false)

  const handleSubmit = () => {
    if (titleGuess.trim() === "") {
      setEmptyError(true)
      return
    } else {
      setEmptyError(false)
      handleGuess()
    }
  }

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={titleGuess}
        onChange={(e) => {
          setTitleGuess(e.target.value)
          if (e.target.value.trim() !== "") {
            setEmptyError(false)
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault()
            handleSubmit()
          }
        }}
        className="w-full p-3 bg-background border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-primary font-semibold"
        placeholder="Escribe el título"
      />
      <button
        onClick={handleSubmit}
        className="w-full px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
      >
        <ArrowRight className="mr-2" />
        Comprobar
      </button>
      {emptyError && (
        <p className="text-red-500 font-semibold mt-2">Escribe algo</p>
      )}
      {isCorrect !== null && (
        <p
          className={`text-lg font-semibold mt-4 ${
            isCorrect ? "text-green-400" : "text-red-400"
          }`}
        >
          {isCorrect ? "¡Correcto! 🎉" : "Incorrecto. Intenta de nuevo."}
        </p>
      )}
    </div>
  )
}
