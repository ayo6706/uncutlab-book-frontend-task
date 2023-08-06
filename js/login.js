var jwt = localStorage.getItem("jwt");
if (jwt != null) {
  window.location.href = './index.html';
}

async function login(event) {
  event.preventDefault(); // Prevent the form from submitting normally
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("https://ayomide-unstacklab-book-backend.up.railway.app/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem("jwt", data.data.token);
      Swal.fire({
        text: data.message,
        icon: 'success',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = './index.html';
        }
      });
    } else {
      Swal.fire({
        text: data.message,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  } catch (error) {
    console.error("Error during login:", error);
    Swal.fire({
      text: "An error occurred during login.",
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }

  return false;
}
