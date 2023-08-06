// JavaScript
function redirectIfJwtAbsent() {
  var jwt = localStorage.getItem("jwt");
  if (jwt == null) {
    window.location.href = './login.html';
    return false; // Exit the function to prevent further execution
  }
  return true; // Token is present, continue
}

function updateTableWithData(books) {
  const tableBody = document.getElementById("mytable");
  tableBody.innerHTML = ""; // Clear existing rows before populating

  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    const row = `<tr>
                  <th scope="row">${i + 1}</th>
                  <td>${book["title"]}</td>
                  <td>${book["author"]}</td>
                  <td>
                    <button type="button" 
                      class="btn btn-outline-secondary" 
                      onclick="showBookEditBox(${book["id"]})">
                      Edit
                    </button>
                    <button type="button" 
                      class="btn btn-outline-danger" 
                      onclick="bookDelete(${book["id"]})">
                      Del
                    </button>
                  </td>
                </tr>`;
    tableBody.innerHTML += row;
  }
}

async function loadUser() {
  if (!redirectIfJwtAbsent()) {
    return; // Exit if JWT is absent
  }

  try {
    const jwt = localStorage.getItem("jwt");
    const response = await fetch("https://ayomide-unstacklab-book-backend.up.railway.app/api/v1/book/find", {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Authorization": `Bearer ${jwt}`,
      },
    });

    if (!response.ok) {
      console.error("Error: Unable to fetch book data.");
      return;
    }

    const data = await response.json();
    console.log(data);

    if (data["success"] === true) {
      const books = data["data"];
      updateTableWithData(books); // Call the function to populate the table with book data
    }
  } catch (error) {
    console.error("Error: Unable to fetch book data.", error);
  }
}

loadUser();

function logout() {
  localStorage.removeItem("jwt");
  window.location.href = './login.html'
}