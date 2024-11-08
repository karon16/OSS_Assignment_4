import BookTable from "./BookTable";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import BookModal from './BookModal';

const API_URL = 'https://606f34c60c054f0017658b43.mockapi.io/books';

const App = () => {
    const [books, setBooks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', API_URL, true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const books = JSON.parse(xhr.responseText).map(book => ({
                ...book,
                year: new Date(book.year).getFullYear() 
            }));
            setBooks(books);
        } else {
            console.error("Error fetching books:", xhr.statusText);
        }
    };
    xhr.onerror = function () {
        console.error("Network Error");
    };
    xhr.send();
};


    const handleShowModal = (book = null) => {
        setSelectedBook(book);
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    const handleSaveBook = (bookData) => {
        const xhr = new XMLHttpRequest();
        const method = bookData.id ? 'PUT' : 'POST';
        const url = bookData.id ? `${API_URL}/${bookData.id}` : API_URL;

        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {
            if (xhr.status === 200 || xhr.status === 201) {
                fetchBooks();
                handleCloseModal();
            } else {
                console.error("Error saving book:", xhr.statusText);
            }
        };

        xhr.onerror = function () {
            console.error("Network Error");
        };

        xhr.send(JSON.stringify(bookData));
    };

    const handleDeleteBook = (id) => {
        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', `${API_URL}/${id}`, true);

        xhr.onload = function () {
            if (xhr.status === 200) {
                fetchBooks();
            } else {
                console.error("Error deleting book:", xhr.statusText);
            }
        };

        xhr.onerror = function () {
            console.error("Network Error");
        };

        xhr.send();
    };

    return (
        <div className="container">
            <h1 className="my-4">Book Management System</h1>
            <Button variant="primary" onClick={() => handleShowModal()}>
                Add New Book
            </Button>

            <BookTable books={books} onEdit={handleShowModal} onDelete={handleDeleteBook} />

            <BookModal
                show={showModal}
                onHide={handleCloseModal}
                onSave={handleSaveBook}
                book={selectedBook}
            />
        </div>
    );
};

export default App;
