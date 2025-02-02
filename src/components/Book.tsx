import { useEffect, useState } from "react";
import { fetchBooks } from "../services/fetchBooks.ts"; // Importamos la función externa
import { Book as BookInterface } from "../models/Book";

const Book = () => {
    const [books, setBooks] = useState<BookInterface[]>([]);
    const [currentBook, setCurrentBook] = useState<BookInterface | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showBook, setShowBook] = useState(false);

    // Cargar libros usando fetchBooks()
    useEffect(() => {
        const loadBooks = async () => {
            try {
                const booksData = await fetchBooks(); // Usamos la función externa
                setBooks(booksData);
            } catch (err) {
                setError("Error fetching books");
            } finally {
                setLoading(false);
            }
        };

        loadBooks();
    }, []);

    const handleButtonClick = () => {
        if (books.length > 0) {
            const randomBook = books[Math.floor(Math.random() * books.length)];
            setCurrentBook(randomBook);
            setShowBook(true);
        }
    };

    return (
        <div className="book-container p-4 border rounded shadow-lg max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">¡Adivina el libro!</h1>

            <button
                onClick={handleButtonClick}
                className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
            >
                Libro alaetorio
            </button>

            {showBook && currentBook && (
                <div className="mt-6">
                    <h2 className="text-xl font-bold mb-4">{currentBook.title}</h2>
                    <p className="text-lg font-semibold">Autor: {currentBook.authors.join(", ")}</p>
                    {currentBook.firstParagraph ? (
                        <div className="mt-4 text-lg">
                            <p>{currentBook.firstParagraph}</p>
                        </div>
                    ) : (
                        <p>No content available for this book.</p>
                    )}
                </div>
            )}

            {error && <div className="mt-4 p-4 bg-red-100 text-red-700 border border-red-400 rounded">{error}</div>}
            {loading && <p>Loading books...</p>}
        </div>
    );
};

export default Book;
