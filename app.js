console.log('ES5 Version');

/******************************
    BOOK CONSTRUCTOR
******************************/
function Book(title, author, isbn, timeStamp) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.timeStamp = timeStamp;
}

/******************************
    UI CONSTRUCTOR
******************************/
function UI() {

}

// Add Prototype
UI.prototype.addBookToList = function(bookEntry) {
    console.log(bookEntry, 'from proto');
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


// Add clear Input to prototype
UI.prototype.clearInput = function() {
    const inputFieldsList = document.querySelectorAll('input');

    // Selects all inputs with type texts and sets to blank
    inputFieldsList.forEach( item => {
        if ( item.type === 'text' ) {
            item.value = '';
        }
    });
}

// Add Show Alert to prototype
UI.prototype.showMessage = function(alertMessage, className) {
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

/******************************
    EVENT LISTENERS
******************************/
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

        // Clear Fields
        ui.clearInput();
        
        // Show Success Message
        ui.showMessage('Book Added.', 'success')

    }

    

    
} 

function onDeleteButtonClick(e) {
    e.preventDefault();

    if ( e.target.id === 'delete-button') {
        // Instantiate UI object
        const ui = new UI();
        const selectedTitle = e.target.parentElement.parentElement.firstElementChild.textContent;
        const message = `${selectedTitle} has been deleted!`
        
        // Show Success Message
        ui.showMessage(message, 'confirm')

        // Remove Item From DOM
        e.target.parentElement.parentElement.remove();
        
        
    } 
}