console.log('ES6 Version');

/************************************
    BOOK CLASS
************************************/

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

/************************************
    UI CLASS
************************************/

class UI {
    addBookToList(bookEntry) {
        const { title, author, isbn } = bookEntry;

        // Select list where to add book
        const list = document.getElementById('book-list');

        // Cteate element
        const row = document.createElement('tr');

        // Insert Columns
        row.innerHTML = `
            <td>${title}</td>
            <td>${author}</td>
            <td>${isbn}</td>
            <td><a id="delete-button" href=#>X</a></td>    
        `;

        // Insert row into DOM inside table
        list.appendChild(row);
    }

    showMessage(alertMessage, className) {
        console.log(alertMessage, className);
        // Select where to show allert
        const div = document.createElement('div');
        div.className = `alert ${className}`;
    
        // Add Text
        div.appendChild(document.createTextNode(alertMessage));
    
        // Add Message to the DOM
        const container = document.querySelector('.container');
        const form = document.getElementById('book-form');
        container.insertBefore(div, form);
    
        setTimeout( () => {
            container.removeChild(div)
        }, 2000);
    }

    deleteBook(target) {
        if ( target.id === 'delete-button') {
            // Remove Item From DOM
            target.parentElement.parentElement.remove();

            const selectedTitle = target.parentElement.parentElement.firstElementChild.textContent;
            const message = `${selectedTitle} has been deleted!`

             // Show Success Message
            this.showMessage(message, 'confirm');
        } 
    }

    clearInput() {
        const inputFieldsList = document.querySelectorAll('input');

        // Selects all inputs with type texts and sets to blank
        inputFieldsList.forEach( item => {
            if ( item.type === 'text' ) {
                item.value = '';
            }
        });
    }
}

/************************************
    STORE CLASS
************************************/
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null ) {
            books = [];
        } else {
            books = JSON.parse( localStorage.getItem('books') );
        }

        return books;
    }

    static displayBooks() {
        const books = Store.getBooks();

        // Loop through Book List
        books.forEach(book => {
            const ui = new UI();

            // Add Book to UI
            ui.addBookToList(book);

        });
    }

    static addBook(book) {
        console.log('Book added to local storage');
        const books = Store.getBooks();
        books.push(book);

        // Set local storage with new items
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(target) {
        console.log('Book reomved from local storage', target);

        const books = Store.getBooks();
        console.log(books, 'Before');

        const newBooksList = books.filter( (book) => {
            console.log(book.isbn, "vs", target);
            return book.isbn !== target;
        });

        console.log(newBooksList, 'After');
        // Set local storage with new items
        localStorage.setItem('books', JSON.stringify(newBooksList));

    }
}
/******************************
    EVENT LISTENERS
******************************/
// On load get items from local storage and display
document.addEventListener('DOMContentLoaded', Store.displayBooks);
document.getElementById('book-form').addEventListener('submit', onFormSubmit );
document.getElementById('book-list').addEventListener('click', onDeleteButtonClick );

/******************************
    FUNCTIONS
******************************/
function onFormSubmit(e) {
    e.preventDefault();
    // console.log('Form Submit Clicked', new Date(e.timeStamp));

    // 1. Get All Fields
    const   title = document.getElementById('title').value;
    const  author = document.getElementById('author').value;
    const    isbn = document.getElementById('isbn').value;
    const timeStamp = e.timeStamp;

    // Instantiate Book object
    const bookEntry = new Book(title, author, isbn, timeStamp);

    // Instantiate UI object
    const ui = new UI();

    // Validate Data 
    if ( title === '' || author === '' || isbn === '' ) {
        ui.showMessage('Please Fill In All Fields.', 'error')
    } else {
        // Add Book To List
        ui.addBookToList(bookEntry);

        // Add Book To Local Storage
        Store.addBook(bookEntry);

        // Clear Fields
        ui.clearInput();
        
        // Show Success Message
        ui.showMessage('Book Added.', 'success')

    }

    

    
} 

function onDeleteButtonClick(e) {
    e.preventDefault();

        // Instantiate UI object
        const ui = new UI();
        
        // Delete Book
        ui.deleteBook(e.target);

        // Remove from Local Storage
        Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    


        
        
}