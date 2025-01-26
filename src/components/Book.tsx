import React, { useState, useEffect } from "react";
import { Book as BookInterface } from "../models/Book"; // Tipo de la API
import axios from 'axios';

const Book = () => {
    const [books, setBooks] = useState<BookInterface[]>([]); // Guardar todos los libros
    const [currentBook, setCurrentBook] = useState<BookInterface | null>(null); // Libro seleccionado
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showBook, setShowBook] = useState(false); // Controla la visibilidad
    const [bookContent, setBookContent] = useState<string | null>(null); // Para guardar el primer párrafo del libro

    // Llamada a la API para obtener todos los libros solo una vez
    useEffect(() => {
        const fetchBookData = async () => {
            setLoading(true);
            setError(null); // Limpiar error previo

            // Verificar si ya hay libros en localStorage
            const storedBooks = localStorage.getItem("books");
            if (storedBooks) {
                // Si hay datos en localStorage, usamos esos libros
                setBooks(JSON.parse(storedBooks));
                setLoading(false);
            } else {
                try {
                    // Si no están en localStorage, hacemos la llamada a la API
                    const response = await fetch("https://gutendex.com/books/");
                    const data = await response.json();
                    const booksData = data.results;

                    // Guardar los libros en el estado
                    setBooks(booksData);

                    // Guardar los libros en localStorage para futuras consultas
                    localStorage.setItem("books", JSON.stringify(booksData));

                } catch (error) {
                    setError("Error fetching book data");
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchBookData(); // Llamada a la API cuando el componente se monta
    }, []); // El array vacío asegura que solo se llame una vez

    // Función para manejar la selección de un libro
    const handleButtonClick = () => {
        if (books.length > 0) {
            // Seleccionar un libro aleatorio
            const randomBook = books[Math.floor(Math.random() * books.length)];
            setCurrentBook(randomBook);
            setShowBook(true);
            fetchFirstParagraph(randomBook); // Llamar a la función para obtener el primer párrafo
        }
    };

    // Realiza una solicitud al backend para obtener el primer párrafo del libro
    const fetchFirstParagraph = async (book: BookInterface) => {
        try {
            // Asegúrate de que el backend esté corriendo en localhost:5000
            const response = await axios.get(`http://localhost:5000/api/book/first-paragraph`, {
                params: { bookUrl: book.formats["text/html"] } // Usamos la URL del libro
            });

            // Guardamos el primer párrafo del libro
            setBookContent(response.data.firstParagraph);
        } catch (error) {
            console.error("Error fetching first paragraph", error);
            setError("Error fetching the first paragraph");
        }
    };

    return (
        <div className="book-container p-4 border rounded shadow-lg max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Book Viewer</h1>

            {/* Botón para cargar la información del libro */}
            <button
                onClick={handleButtonClick}
                className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
            >
                Show Random Book
            </button>

            {/* Mostrar la información del libro solo si showBook es true */}
            {showBook && currentBook && (
                <div className="mt-6">
                    <h2 className="text-xl font-bold mb-4">{currentBook.title}</h2>

                    {/* Mostrar el primer párrafo del libro */}
                    {bookContent && (
                        <div className="mt-4 text-lg">
                            <p>{bookContent}</p>
                        </div>
                    )}

                    {/* Mostrar el mensaje de error si no hay formato HTML */}
                    {!bookContent && <p>No content available for this book.</p>}
                </div>
            )}

            {/* Cargar un mensaje de error si ocurre */}
            {error && (
                <div className="mt-4 p-4 bg-red-100 text-red-700 border border-red-400 rounded">
                    {error}
                </div>
            )}

            {/* Mostrar un mensaje de carga si los libros están siendo cargados */}
            {loading && (
                <p>Loading books...</p>
            )}
        </div>
    );
};

export default Book;
