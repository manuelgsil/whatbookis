// models/Book.ts
export interface Book {
    id: number;
    idProyectoGutenberg: number;
    title: string;
    downloadCount: number;
    url: string;
    firstParagraph: string | null;
    authors: string[];
}
