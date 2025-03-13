let registrationForm = document.getElementById("#registration-form")
form.addEventListener("submit", function (event) {
    event.preventDefault()


    const userData = {
        name: document.getElementById("name").value,
        emailAddress: document.getElementById("email").value,
        role: document.getElementById("password").value,
        password: document.getElementById("password").value,
        passwordRepeat: document.getElementById("password").value,
        



    }

    console.log("information submitted")

});