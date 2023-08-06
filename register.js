async function register(event) {
  event.preventDefault(); // Prevent the form from submitting normally
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("https://ayomide-unstacklab-book-backend.up.railway.app/api/v1/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        password,
      }),
    });

    const data = await response.json();
    console.log(data)

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
    console.error("Error during registration:", error);
    Swal.fire({
      text: "An error occurred during registration.",
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }

  return false;
}
