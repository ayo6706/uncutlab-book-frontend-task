function userCreate() {
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
  
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://www.mecallapi.com/api/users/create");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(
      JSON.stringify({
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