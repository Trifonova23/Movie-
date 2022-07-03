//1. get email value
//2. get pass value
//3. get pass repeat value
//4. check the email and pass values / validation
//5. create request
//6. if success - nav to home
//7. else - show error
//8. add eventListener - btn

const sectionSingUp = document.getElementById("form-sign-up");
const formSingUp = sectionSingUp.getElementsByTagName("form")[0];
const email = document.getElementById("email");
const password = document.getElementById("password");
const repeatPassword = document.getElementById("repeatPassword");

formSingUp.addEventListener("submit", registerUser);

function registerUser(event) {
  event.preventDefault();

  const isEmailValid = email.value.trim() !== "";
  console.log("email", isEmailValid);
  const isPasswordValid = password.value.trim().length >= 6;
  console.log("pass", isPasswordValid);
  const isRepeatPasswordSameAsPassword =
    repeatPassword.value === password.value;
  console.log("pass2", isRepeatPasswordSameAsPassword);
  if (isEmailValid && isPasswordValid && isRepeatPasswordSameAsPassword) {
    register(email.value, password.value);
  } else {
    alert("ERROR!!! Fill all fields");
  }
}

async function register(email, password) {
  try {
    const res = await fetch("http://localhost:3030/users/register", {
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
  } catch (err) {
    console.log(err.message);
    // throw err;
  }
}
