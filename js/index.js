let currentPage = 1;
const booksPerPage = 6;
let allBooksLoaded = false;

// Function to fetch book data from the API
async function fetchBooks(searchText = "", author = "") {
  
  const jwt = localStorage.getItem("jwt");
  const url = `https://ayomide-unstacklab-book-backend.up.railway.app/api/v1/book/find?searchText=${searchText}&author=${author}&page=${currentPage}&limit=${booksPerPage}`;

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Authorization": `Bearer ${jwt}`,
      },
    });

    if (!response.ok) {
      console.error("Error: Unable to fetch book data.");
      return null;
    }

    const data = await response.json();
    return data["success"] === true ? data["data"] : null;
  } catch (error) {
    console.error("Error: Unable to fetch book data.", error);
    return null;
  }
}

// Function to update the card container with book data
function updateCardContainer(books) {
  const cardContainer = document.getElementById("cardContainer");

  // Clear existing cards if it's the first page
  if (currentPage === 1) {
    cardContainer.innerHTML = "";
  }

  // Loop through the books and create Bootstrap cards for each book
  for (const book of books) {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("col-md-4", "mb-4");

    const card = document.createElement("div");
    card.classList.add("card");

    const cardImg = document.createElement("img");
    cardImg.classList.add("card-img-top");
    cardImg.src = "https://edit.org/photos/img/blog/m68-book-cover-templates.jpg-840.jpg"; 
    cardImg.alt = "Book Cover";

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = book.title;

    const cardAuthor = document.createElement("small");
    cardAuthor.classList.add("card-text");
    cardAuthor.textContent = book.author;

    const downloadLink = document.createElement("a");
    downloadLink.classList.add("btn", "btn-primary");
    downloadLink.href = book.downloadLink; // Replace '#' with the actual book download link
    downloadLink.textContent = "Download";

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardAuthor);
    cardBody.appendChild(document.createElement("br"));
    cardBody.appendChild(downloadLink);

    card.appendChild(cardImg);
    card.appendChild(cardBody);

    cardDiv.appendChild(card);

    cardContainer.appendChild(cardDiv);

    const cardFooter = document.createElement("div");
    cardFooter.classList.add("card-footer", "d-flex", "justify-content-between", "align-items-end");
  
    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.classList.add("btn", "btn-outline-secondary");
    editButton.textContent = "Edit";
    editButton.onclick = () => showBookEditBox(book["id"]);
  
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.classList.add("btn", "btn-outline-danger");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => bookDelete(book["id"]);
  
    cardFooter.appendChild(editButton);
    cardFooter.appendChild(deleteButton);
  
    card.appendChild(cardImg);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);
  
    cardDiv.appendChild(card);
  
    cardContainer.appendChild(cardDiv);
  }

  // Check if all books are loaded
  if (books.length < booksPerPage) {
    allBooksLoaded = true;
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    loadMoreBtn.style.display = "none"; // Hide the 'Load More' button if all books are loaded
  } else {
    allBooksLoaded = false;
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    loadMoreBtn.style.display = "block"; // Show the 'Load More' button if there are more books
  }
}

// Function to load more books
async function loadMore() {
  if (!allBooksLoaded) {
    currentPage++;
    const searchText = document.getElementById("searchInput").value;
    const books = await fetchBooks(searchText);
    if (books) {
      updateCardContainer(books);
    }
  }
}

// Function to search for books
async function searchBooks() {
  currentPage = 1; // Reset page when performing a new search
  const searchText = document.getElementById("searchInput").value;
  const books = await fetchBooks(searchText);
  if (books) {
    updateCardContainer(books);
  }
}

// Move the fetchBooks function inside loadUser function to make it more modular
async function loadUser() {
  try {
    const searchText = ""; // Default value for searchText to load all books
    const author = ""; // Default value for author to load all books

    // Fetch the book data from the API
    const books = await fetchBooks(searchText, author);

    if (books) {
      updateCardContainer(books); // Call the function to populate the card container with book data
    }
  } catch (error) {
    console.error("Error: Unable to fetch book data.", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadUser();
});

// Event listeners

document.getElementById("loadMoreBtn").addEventListener("click", loadMore);
document.getElementById("searchInput").addEventListener("input", searchBooks);
