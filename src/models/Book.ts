// models/Book.ts
export interface Book {
    title: string; // El título del libro
    authors: string[]; // Los autores del libro (es un array de strings)
    language: string; // El idioma del libro
    formats: {
        [key: string]: string; // Mapa de formatos disponibles (e.g., html, epub, txt, etc.)
    };
    url: string; // URL del libro (de la API de Gutendex)
    // Otros campos que puedas necesitar
}
