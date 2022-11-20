const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");

const loginBtn = document.querySelector(".login-btn");
loginBtn.addEventListener("click", () => {
  console.log(usernameInput.value);
  console.log(passwordInput.value);
  const usernameValue = usernameInput.value;
  localStorage.setItem("username", usernameValue);
  const passwordValue = passwordInput.value;
  localStorage.setItem("password", passwordValue);
  console.log(localStorage);
  if (usernameInput.value === "") {
    const incorrectLogin = document.querySelector(".incorrect-login");
    incorrectLogin.classList.remove("d-none");
  } else {
    window.location.assign("./homepage.html");
  }
});
