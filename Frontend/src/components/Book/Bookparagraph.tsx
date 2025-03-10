"use client"

import type React from "react"
import { useState } from "react"
import type { BookParagraphProps } from "../../interfaces/types"
import { ImportIcon as Translate, ChevronDown, ChevronUp } from "lucide-react"

const MAX_CHARS = 300

export const BookParagraph: React.FC<BookParagraphProps> = ({
  contentEn,
  contentEs,
  showTranslation,
  toggleTranslation,
}) => {
  const [showFullEn, setShowFullEn] = useState(false)
  const [showFullEs, setShowFullEs] = useState(false)

  const truncateText = (text: string, showFull: boolean) => {
    if (text.length <= MAX_CHARS || showFull) return text
    return text.slice(0, MAX_CHARS) + "..."
  }

  return (
    <div className="card">
      <div className="flex-col sm:flex justify-between items-center mb-4">
      {contentEs && (
          <button onClick={toggleTranslation} className="btn-secondary flex items-center my-3 mx-auto">
            <Translate className="mr-2" size={20} />
            {showTranslation ? "Ocultar traducción" : "Mostrar traducción"}
          </button>
        )}
        <h2 className="heading-2">Párrafo del libro:</h2>
      
      </div>

      {contentEn && (
        <div>
          <h3 className="heading-2">English</h3>
          <p className="text-content">
            {truncateText(contentEn, showFullEn)}
            {contentEn.length > MAX_CHARS && (
              <button onClick={() => setShowFullEn(!showFullEn)} className="ml-2 text-primary hover:underline">
                {showFullEn ? (
                  <>
                    <ChevronUp className="inline mr-1" size={16} />
                    Mostrar menos
                  </>
                ) : (
                  <>
                    <ChevronDown className="inline mr-1" size={16} />
                    Mostrar más
                  </>
                )}
              </button>
            )}
          </p>
        </div>
      )}

      {contentEs && showTranslation && (
        <div className="mt-4">
          <h3 className="heading-2">Español</h3>
          <p className="text-content">
            {truncateText(contentEs, showFullEs)}
            {contentEs.length > MAX_CHARS && (
              <button onClick={() => setShowFullEs(!showFullEs)} className="ml-2 text-primary hover:underline">
                {showFullEs ? (
                  <>
                    <ChevronUp className="inline mr-1" size={16} />
                    Mostrar menos
                  </>
                ) : (
                  <>
                    <ChevronDown className="inline mr-1" size={16} />
                    Mostrar más
                  </>
                )}
              </button>
            )}
          </p>
        </div>
      )}

      {!contentEn && !contentEs && <p className="text-content">No hay contenido disponible para este libro.</p>}
    </div>
  )
}

