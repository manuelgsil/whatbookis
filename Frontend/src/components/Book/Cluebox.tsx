import type React from "react"
import { Lock } from "lucide-react"
import type { ClueBoxProps } from "../../interfaces/types"

export const ClueBox: React.FC<ClueBoxProps> = ({title, value, unlocked, onUnlock }) => (
  <div className="card transition-all duration-300 ease-in-out transform hover:scale-105">
    <h3 className="heading-2">{title}</h3>
    {unlocked ? (
      <p className="text-content animate-fade-in">{value != null ? value : "Desconocido"}</p>
    ) : (
      <button onClick={onUnlock} className="btn-secondary w-full flex items-center justify-center">
        <Lock className="mr-2" />
        Desbloquear {title.toLowerCase()}
      </button>
    )}
  </div>
)

