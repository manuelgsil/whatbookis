import type React from "react"
import { Heart, Star } from "lucide-react"

interface GameStatsProps {
  lives: number
  correctGuesses: number
}

export const GameStats: React.FC<GameStatsProps> = ({ lives, correctGuesses }) => (
  <div className="flex justify-between items-center mt-4">
    <div className="flex items-center">
      <Heart className="text-red-500 mr-2" />
      <span className="text-xl font-bold">{lives}</span>
    </div>
    <div className="flex items-center">
      <Star className="text-yellow-500 mr-2" />
      <span className="text-xl font-bold">{correctGuesses}/3</span>
    </div>
  </div>
)

