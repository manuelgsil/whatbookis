import axios from "axios";
import { Book } from "../interfaces/types";

export async function fetchBooks(): Promise<Book[]> {
    try {
        // Hacemos la llamada a la API con los campos correctos
        const response = await axios.get<Book[]>("http://127.0.0.1:8000/libros/");
        
        return response.data.map((book) => ({
            titulo: book.titulo,  // Mantenemos el campo "titulo" como está en el backend
            titulo_es: book.titulo_es,  // Cambiamos "tituloEs" por "titulo_es" (campo correcto del backend)
            titulo_IA: book.titulo_IA,
            pista_IA: book.pista_IA,
            enlace: book.enlace,
            temas: book.temas,
            primer_parrafo_en: book.primer_parrafo_en || "No paragraph available",  // "primer_parrafo_en"
            primer_parrafo_es: book.primer_parrafo_es || "No translation available",  // "primer_parrafo_es"
            autores: book.autores.map((autor) => ({
                nombre: autor.nombre,
                nacimiento: autor.nacimiento,
                fallecimiento: autor.fallecimiento,
            })),
        }));
    } catch (error) {
        console.error("Error fetching books", error);
        throw new Error("Error fetching books");
    }
}
