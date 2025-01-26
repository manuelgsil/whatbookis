import { Book } from '../models/Book';

export async function fetchBooks(): Promise<Book[]> {
    const response = await fetch('https://gutendex.com/books/');
    const data = await response.json();

    // Mapear los datos a la interfaz Book
    const books: Book[] = data.results.map((book: any) => {
        // Extraer el enlace al texto completo en formato 'text/plain'

        return {
            id: book.id,
            title: book.title,
            author: book.authors[0]?.name || 'Unknown Author',
            downloadCount: book.download_count,
            language: book.languages,
            urlBook: book.formats['text/html'] // Asignar el enlace al texto completo
        };
    });

    return books;
}


