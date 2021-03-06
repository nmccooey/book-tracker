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

	let readBookStatus = "No"; // Default is not read.
	let readBookValue = document.getElementById("read-book-checkbox").checked;
	if (readBookValue == true) {
		readBookStatus = "Yes";
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
	newRow.className = "book-row";
	newRow.setAttribute('data-index', `${bookIndexNumber}`);
	tableBody.appendChild(newRow);

	for (key in newBook) {
        const newTD = document.createElement('td');
		newTD.innerHTML = newBook[key];
		if (key == "isRead") {
			newTD.className = "read-status";
		}
		newRow.appendChild(newTD);
	}

	// Add Read button.
	const readButtonTD = document.createElement('td');
	newRow.appendChild(readButtonTD);
	const readButton = document.createElement("button");
	let isReadValue = bookList[bookIndexNumber].isRead;
	readButton.className = "read-button button";
	readButton.setAttribute("type", "button");
	readButton.innerHTML = "Change";
	readButtonTD.appendChild(readButton);

	readButton.addEventListener("click", function() {
		const rowIndex = document.querySelector(`[data-index="${bookIndexNumber}"]`);
		if (isReadValue == "No") {
			isReadValue = "Yes"
		} else {
			isReadValue = "No";
		}
		rowIndex.querySelector(".read-status").innerHTML = isReadValue;	
	});
	

	// Add delete button.
	const deleteButtonTD = document.createElement('td');
	newRow.appendChild(deleteButtonTD);
	const deleteButton = document.createElement("button");
	deleteButton.className = "delete-button";
	deleteButton.setAttribute("type", "button");
	deleteButton.innerHTML = "&#10006;";
	deleteButtonTD.appendChild(deleteButton);

	deleteButton.addEventListener("click", function() {
		const rowIndex = document.querySelector(`[data-index="${bookIndexNumber}"]`);
        tableBody.removeChild(rowIndex);
        delete bookList[bookIndexNumber];
	});

	document.querySelector('.bg-modal').style.display = "none";
}