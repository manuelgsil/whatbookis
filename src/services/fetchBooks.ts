import axios from "axios";
import { Book } from "../models/Book";

export async function fetchBooks(): Promise<Book[]> {
    try {
        const response = await axios.get("http://localhost:8000/api/libros/"); // Llamada a la API Django
        return response.data.map((book: any) => ({
            id: book.id,
            title: book.titulo, // Ajusta el nombre según tu backend
            authors: book.autores.map((autor: any) => autor.nombre), // Extraer los nombres de los autores
            downloadCount: book.cantidad_descargas,
            urlBook: book.enlace, // Enlace al libro
            firstParagraph: book.primer_parrafo_en || "No paragraph available", // Usamos primer_parrafo_en
        }));
    } catch (error) {
        console.error("Error fetching books", error);
        throw new Error("Error fetching books");
    }
}
