// JavaScript
function redirectIfJwtAbsent() {
  var jwt = localStorage.getItem("jwt");
  if (jwt == null) {
    window.location.href = './login.html';
    return false; // Exit the function to prevent further execution
  }
  return true; // Token is present, continue
}

function showBookCreateBox() {
  Swal.fire({
      title: "Add Book",
      html:
          '<input id="id" type="hidden">' +
          '<input id="title" class="swal2-input" placeholder="book name">' +
          '<input id="author" class="swal2-input" placeholder="jane doe">' +
          '<input id="bookFile" type="file">',
      focusConfirm: false,
      preConfirm: () => {
          bookCreate();
      },
  });
}

  
async function bookCreate() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const bookFileInput = document.getElementById("bookFile");
  const bookFile = bookFileInput.files[0];

  try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("bookFile", bookFile);

      const response = await fetch("https://ayomide-unstacklab-book-backend.up.railway.app/api/v1/book", {
          method: "POST",
          headers: {
              // Remove the "Content-Type" header since we are using FormData
              "Authorization": "Bearer " + localStorage.getItem("jwt"),
          },
          body: formData, // Use the FormData object as the body
      });

      if (!response.ok) {
          console.error("Error: Unable to create the book.");
          return;
      }

      const data = await response.json();
      Swal.fire(data["message"]);
      loadTable();
  } catch (error) {
      console.error("Error: Unable to create the book.", error);
  }
}

  


  async function showBookEditBox(id) {
    try {
      const response = await fetch(`https://ayomide-unstacklab-book-backend.up.railway.app/api/v1/book?id=${id}`, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("jwt"),
        },
      });
  
      if (!response.ok) {
        console.error("Error: Unable to fetch book data for editing.");
        return;
      }
  
      const objects = await response.json();
      console.log(objects)
      const user = objects["data"];
      console.log(user);
      Swal.fire({
        title: "Edit Book",
        html:
          `<input id="id" type="hidden" value=${user["id"]}>` +
          `<input id="title" class="swal2-input" placeholder="title" value="${user["title"]}">` +
          `<input id="author" class="swal2-input" placeholder="author" value="${user["author"]}">`,
        focusConfirm: false,
        preConfirm: () => {
          bookEdit();
        },
      });
    } catch (error) {
      console.error("Error: Unable to fetch book data for editing.", error);
    }
  }
  
  async function bookEdit() {
    const id = document.getElementById("id").value;
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
  
    try {
      const response = await fetch("https://ayomide-unstacklab-book-backend.up.railway.app/api/v1/book", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Authorization": "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          id: id,
          title: title,
          author: author,
        }),
      });
  
      if (!response.ok) {
        console.error("Error: Unable to update the book.");
        return;
      }
  
      const data = await response.json();
      Swal.fire(data["message"]);
      loadTable();
    } catch (error) {
      console.error("Error: Unable to update the book.", error);
    }
  }
  
  


  function loadTable() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://ayomide-unstacklab-book-backend.up.railway.app/api/v1/book");
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var trHTML = "";
        const objects = JSON.parse(this.responseText);
        for (let object of objects) {
          trHTML += "<tr>";
          trHTML += "<td>" + object["id"] + "</td>";
          trHTML +=
            '<td><img width="50px" src="' +
            object["avatar"] +
            '" class="avatar"></td>';
          trHTML += "<td>" + object["fname"] + "</td>";
          trHTML += "<td>" + object["lname"] + "</td>";
          trHTML += "<td>" + object["username"] + "</td>";
          trHTML +=
            '<td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox(' +
            object["id"] +
            ')">Edit</button>';
          trHTML +=
            '<button type="button" class="btn btn-outline-danger" onclick="userDelete(' +
            object["id"] +
            ')">Del</button></td>';
          trHTML += "</tr>";
        }
        document.getElementById("mytable").innerHTML = trHTML;
      }
    };
  }
  
  loadTable();


  async function bookDelete(id) {
    if (!redirectIfJwtAbsent()) {
      return; // Exit if JWT is absent
    }
    try {
      const jwt = localStorage.getItem("jwt");
      const response = await fetch(`https://ayomide-unstacklab-book-backend.up.railway.app/api/v1/book?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Authorization": `Bearer ${jwt}`,
        },
      });
  
      if (!response.ok) {
        console.error("Error: Unable to delete the book.");
        return;
      }
  
      const data = await response.json();
      Swal.fire(data["message"]);
      loadTable();
    } catch (error) {
      console.error("Error: Unable to delete the book.", error);
    }
  }