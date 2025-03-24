import axios from "axios";
import { Book } from "../interfaces/types";
import emergencyBooks from "./datos.json"; // Importa los libros de emergencia

export async function fetchBooks(): Promise<Book[]> {
    let booksData: Book[]; // Variable para almacenar los datos de los libros

    try {
        // Hacemos la llamada a la API
        const response = await axios.get<Book[]>("http://127.0.0.1:8000/libros/");
        booksData = response.data.map((book) => ({
            titulo: book.titulo,
            titulo_es: book.titulo_es,
            titulo_IA: book.titulo_IA,
            pista_IA: book.pista_IA,
            enlace: book.enlace,
            temas: book.temas,
            primer_parrafo_en: book.primer_parrafo_en || "No paragraph available",
            primer_parrafo_es: book.primer_parrafo_es || "No translation available",
            autores: book.autores.map((autor) => ({
                nombre: autor.nombre,
                nacimiento: autor.nacimiento,
                fallecimiento: autor.fallecimiento,
            })),
        }));
    } catch (error) {
        console.error("Error fetching books, using emergency books instead", error);

        // Filtra los autores del JSON de emergencia
        const authors = emergencyBooks
            .filter((item: any) => item.model === "api.autor")
            .map((author: any) => ({
                id: author.pk,
                nombre: author.fields.nombre,
                nacimiento: author.fields.nacimiento,
                fallecimiento: author.fields.fallecimiento,
            }));

        // Si la API falla, usamos los libros de emergencia
        booksData = emergencyBooks
            .filter((item: any) => item.model === "api.libro") // Filtra los objetos que son libros
            .map((book: any) => ({
                titulo: book.fields.titulo || "Título no disponible",
                titulo_es: book.fields.titulo_es || null,
                titulo_IA: book.fields.titulo_IA || null,
                pista_IA: book.fields.pista_IA || null,
                enlace: book.fields.enlace || "",
                temas: book.fields.temas || [],
                primer_parrafo_en: book.fields.primer_parrafo_en || "No paragraph available",
                primer_parrafo_es: book.fields.primer_parrafo_es || "No translation available",
                autores: book.fields.autores?.map((autorId: number) => {
                    const autor = authors.find((a) => a.id === autorId);
                    return {
                        nombre: autor?.nombre || `Autor con ID ${autorId}`,
                        nacimiento: autor?.nacimiento || null,
                        fallecimiento: autor?.fallecimiento || null,
                    };
                }) || [],
            }));
    }

    return booksData; // Retornamos los datos almacenados en la variable
}