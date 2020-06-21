let bookList = [];

function Book(title, author, pages, isRead) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.isRead = isRead;
}

// Add Book Button on the main page.
document.getElementById('add-book-button').addEventListener("click", function() {
	document.querySelector('.bg-modal').style.display = "flex";
});

// Close Button in the Modal.
document.querySelector('.close').addEventListener("click", function() {
	document.querySelector('.bg-modal').style.display = "none";
});

// Submit Button in the Modal.
document.getElementById("book-form").addEventListener("submit", addBook);


// Gets data from form and pushed a new book to the book list.
function addBook(event) {
	event.preventDefault();

	let titleValue = document.getElementById("title-input").value;
	let authorValue = document.getElementById("author-input").value;
	let pagesValue = document.getElementById("pages-input").value;

	let readBookStatus = "In-Progress"; // Default is not read.
	let readBookValue = document.getElementById("read-book-checkbox").checked;
	if (readBookValue == true) {
		readBookStatus = "&check;"
	}
	
	let newBook = new Book(titleValue, authorValue, pagesValue, readBookStatus);
	bookList.push(newBook);
	newRender(newBook);
  }

// Updates the table with the new book's data.
function newRender(newBook) {
	const tableBody = document.querySelector(".table-body");
	const newRow = document.createElement("tr");
	let bookIndexNumber = bookList.indexOf(newBook);
	newRow.setAttribute('data-index', `${bookIndexNumber}`);
	tableBody.appendChild(newRow);

	for (key in newBook) {
        const newTD = document.createElement('td');
		newTD.innerHTML = newBook[key];
		newRow.appendChild(newTD);
	
	}
	
	document.querySelector('.bg-modal').style.display = "none";
}