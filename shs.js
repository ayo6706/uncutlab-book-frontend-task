function showUserEditBox(id) {
    console.log(id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://www.mecallapi.com/api/users/" + id);
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        const user = objects["user"];
        console.log(user);
        Swal.fire({
          title: "Edit User",
          html:
            '<input id="id" type="hidden" value=' +
            user["id"] +
            ">" +
            '<input id="fname" class="swal2-input" placeholder="First" value="' +
            user["fname"] +
            '">' +
            '<input id="lname" class="swal2-input" placeholder="Last" value="' +
            user["lname"] +
            '">' +
            '<input id="username" class="swal2-input" placeholder="Username" value="' +
            user["username"] +
            '">' +
            '<input id="email" class="swal2-input" placeholder="Email" value="' +
            user["email"] +
            '">',
          focusConfirm: false,
          preConfirm: () => {
            userEdit();
          },
        });
      }
    };
  }
  
  function userEdit() {
    const id = document.getElementById("id").value;
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
  
    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "https://www.mecallapi.com/api/users/update");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(
      JSON.stringify({
        id: id,
        fname: fname,
        lname: lname,
        username: username,
        email: email,
        avatar: "https://www.mecallapi.com/users/cat.png",
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