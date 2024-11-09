const API_URL = 'https://606f34c60c054f0017658b43.mockapi.io/books';

window.onload = getBooks;

function getBooks() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', API_URL);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const books = JSON.parse(xhr.responseText);
            displayBooks(books);
        }
    };
    xhr.send();
}

function displayBooks(books) {
    let table = `<table class="table table-striped">
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
        <tbody>`;
    
    books.forEach(book => {
        // Extract only the year if book.year is a full date
        const year = new Date(book.year).getFullYear(); // Gets only the year part

        table += `<tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${year}</td>
            <td>${book.genre}</td>
            <td>$${book.price}</td>
            <td>
                <button onclick="openEditModal(${book.id})" class="btn btn-warning btn-sm">Edit</button>
                <button onclick="deleteBook(${book.id})" class="btn btn-danger btn-sm">Delete</button>
            </td>
        </tr>`;
    });
    
    table += '</tbody></table>';
    document.getElementById('bookList').innerHTML = table;
}


function openEditModal(id) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API_URL}/${id}`);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const book = JSON.parse(xhr.responseText);
            document.getElementById('bookId').value = book.id;
            document.getElementById('title').value = book.title;
            document.getElementById('author').value = book.author;
            document.getElementById('year').value = book.year;
            document.getElementById('genre').value = book.genre;
            document.getElementById('price').value = book.price;
            document.getElementById('modalTitle').innerText = 'Edit Book';
            $('#bookModal').modal('show');
        }
    };
    xhr.send();
}

function saveBook() {
    const bookId = document.getElementById('bookId').value;
    const book = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        year: parseInt(document.getElementById('year').value),
        genre: document.getElementById('genre').value,
        price: parseFloat(document.getElementById('price').value)
    };

    const xhr = new XMLHttpRequest();
    xhr.open(bookId ? 'PUT' : 'POST', bookId ? `${API_URL}/${bookId}` : API_URL);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status === 200 || xhr.status === 201) {
            $('#bookModal').modal('hide');
            getBooks();
        }
    };
    xhr.send(JSON.stringify(book));
}

function deleteBook(id) {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `${API_URL}/${id}`);
    xhr.onload = function() {
        if (xhr.status === 200) {
            getBooks();
        }
    };
    xhr.send();
}
