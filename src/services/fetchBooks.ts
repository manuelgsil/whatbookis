import axios from "axios";
import { Book } from "../models/types";

export async function fetchBooks(): Promise<Book[]> {
    try {
        const response = await axios.get("http://localhost:8000/api/libros/");
        return response.data.map((book: any) => ({
            id: book.id,
            idProyectoGutenberg: book.id_proyecto_gutenberg,
            titulo: book.titulo,
            tituloEs: book.titulo_es,
            downloadCount: book.cantidad_descargas,
            enlace: book.enlace,
            temas: book.temas,
            primerParrafoEn: book.primer_parrafo_en || "No paragraph available",
            primerParrafoEs: book.primer_parrafo_es || "No translation available",
            autores: book.autores.map((autor: any) => ({
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
