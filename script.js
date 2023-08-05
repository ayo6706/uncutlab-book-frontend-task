function showBookCreateBox() {
    Swal.fire({
      title: "Add Book",
      html:
        '<input id="id" type="hidden">' +
        '<input id="title" class="swal2-input" placeholder="book name">' +
        '<input id="author" class="swal2-input" placeholder="jane doe">',
      focusConfirm: false,
      preConfirm: () => {
        bookCreate();
      },
    });
  }
  
  function bookCreate() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
  
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://ayomide-unstacklab-book-backend.up.railway.app/api/v1/book");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(
      JSON.stringify({
        title: title,
        author: author,
      })
    );
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects["message"]);
        loadTable();
      }
    };
  }


  function showBookEditBox(id) {
    console.log(id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://ayomide-unstacklab-book-backend.up.railway.app/api/v1/book" + id);
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        const user = objects["user"];
        console.log(user);
        Swal.fire({
          title: "Edit Book",
          html:
            '<input id="id" type="hidden" value=' +
            user["id"] +
            ">" +
            '<input id="title" class="swal2-input" placeholder="title" value="' +
            user["title"] +
            '">' +
            '<input id="author" class="swal2-input" placeholder="author" value="' +
            user["author"] +
            '">',
          focusConfirm: false,
          preConfirm: () => {
            bookEdit();
          },
        });
      }
    };
  }
  
  function bookEdit() {
    const id = document.getElementById("id").value;
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;

    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "https://ayomide-unstacklab-book-backend.up.railway.app/api/v1/book");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(
      JSON.stringify({
        id: id,
        title: title,
        author: author,
      })
    );
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects["message"]);
        loadTable();
      }
    };
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


  function bookDelete(id) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "https://ayomide-unstacklab-book-backend.up.railway.app/api/v1/book");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(
      JSON.stringify({
        id: id,
      })
    );
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects["message"]);
        loadTable();
      }
    };
  }