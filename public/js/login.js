document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission if validation fails

        let isValid = true;
        
        function showError(id, message) {
            document.getElementById(id).innerText = message;
        }

        function clearErrors() {
            document.querySelectorAll(".error").forEach(el => el.innerText = "");
        }

        clearErrors();

        // Get form data
        const userData = {
            email: document.getElementById("email").value.trim(),
            password: document.getElementById("password").value.trim()
        };

        // Validate email
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userData.email)) {
            showError("emailError", "Enter a valid email address.");
            isValid = false;
        }

        // Validate password
        if (userData.password.length < 6) {
            showError("passwordError", "Password must be at least 6 characters long.");
            isValid = false;
        }

        if (isValid) {
            console.log("Information submitted");
            // Submit the form
            loginForm.submit();
        }
    });
});