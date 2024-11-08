import React from 'react';
import { Table, Button } from 'react-bootstrap';

const BookTable = ({ books, onEdit, onDelete }) => (
    <Table striped bordered hover className="mt-4">
        <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Year</th>
                <th>Genre</th>
                <th>Price</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {books.map(book => (
                <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.year}</td>
                    <td>{book.genre}</td>
                    <td>${book.price}</td>
                    <td>
                        <Button variant="warning" size="sm" onClick={() => onEdit(book)}>
                            Edit
                        </Button>{' '}
                        <Button variant="danger" size="sm" onClick={() => onDelete(book.id)}>
                            Delete
                        </Button>
                    </td>
                </tr>
            ))}
        </tbody>
    </Table>
);

export default BookTable;
