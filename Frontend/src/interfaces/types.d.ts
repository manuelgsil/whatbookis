import { ReactNode } from "react"

// Interfaz del autor, ahora con los datos del modelo de autor
export interface Author {
  nombre: string
  nacimiento: number | null
  fallecimiento: number | null
}

// Interfaz del libro, reflejando los cambios del serializer
export interface Book {
  titulo: string  // En inglés
  titulo_es: string | null  // En español
  titulo_IA?: string  // En lugar de tituloIA: string | null
  enlace: string
  temas: string[]
  primer_parrafo_en: string | null  // Primer párrafo en inglés
  primer_parrafo_es: string | null  // Primer párrafo en español
  autores: Author[]  // Relación con autores
  pista_IA?: string | null | undefined  // Pista IA (opcional)
}

// Interfaz para el estado del juego
export interface GameState {
  books: Book[]  // Lista de libros disponibles para el juego
  currentBook: Book | null  // Libro actual seleccionado
  showBook: boolean  // Flag para mostrar el libro
  titleGuess: string  // Adivinanza del título por parte del jugador
  isCorrect: boolean | null  // Indica si la adivinanza fue correcta
  attempts: number  // Intentos restantes
  correctGuesses: number  // Número de aciertos
  lives: number  // Vidas restantes
  unlockedClues: boolean[]  // Pistas desbloqueadas (Array de booleanos)
  title:string
}

// Interfaz para las props del componente BookParagraph
export interface BookParagraphProps {
  contentEn: string | null  // Contenido en inglés
  contentEs: string | null  // Contenido en español
  showTranslation: boolean;
  toggleTranslation: ()=> void;
}

// Interfaz para las props del componente GuessInput
export interface GuessInputProps {
  titleGuess: string  // Adivinanza del título
  setTitleGuess: (guess: string) => void  // Función para actualizar la adivinanza
  handleGuess: () => void  // Función para manejar la adivinanza
  isCorrect: boolean | null  // Estado si la adivinanza fue correcta o no
}

// Interfaz para las props del componente GameStats
export interface GameStatsProps {
  lives: number  // Vidas restantes
  correctGuesses: number  // Aciertos correctos
  isTitleVisible: boolean  
  title: string
}

// Interfaz para las props del componente ClueBox
export interface ClueBoxProps {
  index: number  // Índice de la pista
  title: string  // Título de la pista
  value: string | number   // Valor de la pista (puede ser texto o número)
  unlocked: boolean  // Si la pista ha sido desbloqueada
  onUnlock: () => void  // Función para desbloquear la pista
}

// Interfaz para el resultado de useBookGame hook
export interface UseBookGameResult {
  books: Book[]  // Lista de libros disponibles para jugar
  currentBook: Book | null  // Libro seleccionado actualmente
  loading: boolean  // Estado de carga de los libros
  error: string | null  // Error si ocurre algún problema al cargar los libros
  showBook: boolean  // Estado para mostrar o no el libro
  titleGuess: string  // Adivinanza del título
  setTitleGuess: (guess: string) => void  // Función para actualizar la adivinanza
  isCorrect: boolean | null  // Estado si la adivinanza fue correcta
  attempts: number  // Intentos realizados
  correctGuesses: number  // Aciertos realizados
  lives: number  // Vidas restantes
  unlockedClues: boolean[]  // Pistas desbloqueadas
  handleButtonClick: () => void  // Función para seleccionar un nuevo libro
  handleGuess: () => void  // Función para verificar la adivinanza
  handleNext: () => void  // Función para ir al siguiente libro
  resetGame: () => void  // Función para reiniciar el juego
  unlockClue: (index: number) => void  // Función para desbloquear una pista
  handleGameEnd:()=> void
}
export interface LayoutMainProps {
  children: ReactNode // Permite recibir un componente dinámico
}