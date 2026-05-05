    /* signin */
const signinform = document.querySelector(".signin-overlay__form")
const signinError = document.querySelector(".signin-overlay__error")

signinform.addEventListener("submit", (event) => {
    const formData = new FormData(signinform)
    const signInBody = Object.fromEntries(formData.entries())

    let users = JSON.parse(localStorage.getItem("usersData")) || []

    const userFound = users.find(user => 
        user.email === signInBody.email && user.password === signInBody.password
    )

    if (userFound) {
        alert(`Welcome back, ${userFound.fullname || 'User'}!`)

        signInOverlay.style.visibility = "hidden"
        signinError.textContent = ""
    } else {
        signinError.textContent = "Invalid email or password!"
        signinError.style.color = "red"
    }
})

/* signup form */
const signupform = document.querySelector(".signup-overlay__form")

signupform.addEventListener("submit", (event) => {
    event.preventDefault()

    const formData = new FormData(signupform)
    const signUpBody = Object.fromEntries(formData.entries())

    let users = JSON.parse(localStorage.getItem("usersData")) || []
    users.push(signUpBody)
    localStorage.setItem("usersData", JSON.stringify(users))

    alert("You have successfully registered. You can now log in")
})

/* close - open*/
const loginBtn = document.querySelector(".login__button")
const closeButtons = document.querySelectorAll(".signup-overlay__close, .signin-overlay__close")

const signInOverlay = document.querySelector(".signin-overlay")
const signUpOverlay = document.querySelector(".signup-overlay")

loginBtn.addEventListener("click", (element) => {
    element.preventDefault();
    signInOverlay.style.visibility = "visible"
})

closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        signInOverlay.style.visibility = "hidden"
        signUpOverlay.style.visibility = "hidden"

    })
})

const signupLink = document.querySelector(".signin-overlay__question a")
signupLink.addEventListener("click", () => {
  signInOverlay.style.visibility = "hidden"
  signUpOverlay.style.visibility = "visible"
})

const signinLink = document.querySelector(".signup-overlay__question a")

signinLink.addEventListener("click", () => {
  signUpOverlay.style.visibility = "hidden"
  signInOverlay.style.visibility = "visible"
})