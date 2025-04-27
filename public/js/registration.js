document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("registration-form");
    
    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission if validation fails

        let isValid = true;
        
        function showError(id, message) {
            const errorElement = document.getElementById(id);
            if (errorElement) {
                errorElement.innerText = message;
            } else {
                console.error(`Error element with id ${id} not found`);
            }
        }

        function clearErrors() {
            document.querySelectorAll(".error").forEach(el => el.innerText = "");
        }

        clearErrors();

        // Get form values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("emailaddress").value.trim();
        const role = document.getElementById("role").value.trim();
        const branch = document.getElementById("branch").value.trim();
        const password = document.getElementById("password").value.trim();
        const passwordRepeat = document.getElementById("passwordrepeat").value.trim();

        // Validate name
        if (!/^[A-Za-z ]{2,}$/.test(name)) {
            showError("name-error", "Name must contain only letters and be at least 2 characters long.");
            isValid = false;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError("email-error", "Enter a valid email address.");
            isValid = false;
        }

        // Validate password
        if (password.length < 6) {
            showError("password-error", "Password must be at least 6 characters long.");
            isValid = false;
        }

        // Validate password confirmation
        if (passwordRepeat !== password) {
            showError("password-repeat-error", "Passwords do not match.");
            isValid = false;
        }

        if (isValid) {
            // Instead of just logging data, actually submit the form
            registrationForm.submit();
            // Don't need the alert here as it will redirect
        }
            
            
            
            // In a real application, you would submit the form here
            // registrationForm.submit();
            
            
        
    });
});
