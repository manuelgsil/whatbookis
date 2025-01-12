import Header from "../components/Header";

export function LayoutGame(){
    return (
      <div className="flex flex-col min-h-screen">
        <Header></Header>
            <div className="flex-grow flex items-center justify-center"> {/* Usamos flex-grow para que el contenido se acomode arriba */}
                <div>
                    <h1 className="text-4xl font-bold text-center">Bienvenido al Quiz</h1>
                    <p className="text-center mt-4">¡Aquí empieza el juego de adivinanza de libros!</p>
                </div>
            </div>
        </div>
    
  );
  
  }