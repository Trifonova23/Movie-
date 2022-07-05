//get section
//get tag name - form
//get email value
//get pass value
//check the email and pass value / validation
//create request
//save to local storage data
//if is valid - nav to home page
//else - show error
//add event listener of btn "login"

const sectionLogin = document.getElementById("form-login");
const formLogin = document.getElementsByTagName("form")[0];
const email = document.getElementById("email");
const password = document.getElementById("password");

formLogin.addEventListener("submit", loginUser);

function loginUser(event) {
  event.preventDefault();

  const isEmailValid = email.value.trim() !== "";
  console.log("email", isEmailValid);
  const isPasswordValid = password.value.trim().length >= 6;
  console.log("password", isPasswordValid);

  if (isEmailValid && isPasswordValid) {
    login(email.value, password.value);
    console.log("test");
  } else {
    alert("Error! Please full all fields and try again :)");
  }
}

async function login(email, password) {
  try {
    const res = await fetch("http://localhost:3030/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    // console.log('res', await res.json())
    // if (!res.ok) {
    //     const error = await res.json();
    //     throw new Error(error.message);
    // }

    const user = await res.json();
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "/02.Movies/home.html";
    console.log(user, "test user");
  } catch (err) {
    console.log(err.message);
    // throw err;
  }
}
