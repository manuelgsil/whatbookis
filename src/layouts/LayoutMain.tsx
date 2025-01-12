import Hero from '../components/Hero';
import Header from '../components/Header';
import Footer from '../components/Footer';


/**
 * Componente Layout que recibe children como prop y lo renderiza entre el Header y el Footer.
 *
 * @export  -> Permite que este componente pueda ser importado y usado en otros archivos.
 * @param  {object} props -> Este componente recibe un objeto con la prop children.
 * @param  {React.ReactNode} props.children -> El contenido que se pasa entre las etiquetas del componente (puede ser cualquier cosa renderizable en React).
 * @returns {JSX.Element} -> El componente devuelve un elemento JSX que contiene el layout de la página.
 */
export function LayoutMain(){
  return (
    <div>
    <Header />
    <div className="flex flex-col min-h-screen width-100">
      <Hero />
    </div>
    <Footer></Footer>
  </div>
);

}

/*  
Equivalente más explícito (sin desestructuración):

ts
function Layout(props: { children: React.ReactNode }): JSX.Element {
  const children = props.children;
  // Luego usas children normalmente
}
Usando desestructuración:

ts
function Layout({ children }: { children: React.ReactNode }): JSX.Element {
  // Ya tienes directamente el valor de "children"
}
En resumen:

{ children }: Es lo mismo que decir const children = props.children;, pero de manera más concisa.
: { children: React.ReactNode } (Tipado de la desestructuración):
Esta parte está definiendo los tipos de las props que espera el componente Layout.
Como el componente solo usa la propiedad children, solo necesitamos definir el tipo de children.
{ children: React.ReactNode }: Especifica que children es un objeto de tipo React.ReactNode, que es un tipo especial en React que representa cualquier cosa que pueda ser renderizada: texto, números, elementos JSX, null, undefined, etc.*/
