import type React from "react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-background p-6 rounded-lg shadow-xl max-w-md w-full m-4">
        <div className="max-h-[80vh] overflow-y-auto">{children}</div>

        <button onClick={onClose} className="btn-secondary  mt-4">
          Cerrar   
        </button>
      </div>
    </div>
  )
}
