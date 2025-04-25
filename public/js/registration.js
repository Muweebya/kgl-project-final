let registrationForm = document.getElementById("registration-form")
registrationForm.addEventListener("submit", function (event) {
    event.preventDefault()


    const userData = {
        name: document.getElementById("name").value,
        email: document.getElementById("emailaddress").value,
        role: document.getElementById("password").value,
        password: document.getElementById("password").value,
        passwordRepeat: document.getElementById("passwordrepeat").value,
        



    }

    console.log("information submitted")

});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("registration-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission if validation fails

        let isValid = true;
        
        function showError(id, message) {
            document.getElementById(id).innerText = message;
        }

        function clearErrors() {
            document.querySelectorAll(".error").forEach(el => el.innerText = "");
        }

        clearErrors();

        let name = document.getElementById("name").value.trim();
        if (!/^[A-Za-z ]{2,}$/.test(name)) {
            showError("nameError", "Name must contain only letters and be at least 2 characters long.");
            isValid = false;
        }

        let email = document.getElementById("email").value.trim();
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError("emailError", "Enter a valid email address.");
            isValid = false;
        }

        let password = document.getElementById("password").value.trim();
        if (password.length < 6) {
            showError("passwordError", "Password must be at least 6 characters long.");
            isValid = false;
        }

        let passwordRepeat = document.getElementById("passwordrepeat").value.trim();
        if (passwordRepeat !== password) {
            showError("passwordRepeatError", "Passwords do not match.");
            isValid = false;
        }

        if (isValid) {
            alert("Registration form submitted successfully!");
            this.submit(); // Submit the form if all validations pass
        }
    });
});
