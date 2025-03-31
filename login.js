let loginForm = document.getElementById("login-form")
loginForm.addEventListener("submit", function(event){
    event.preventDefault()
  
    
    const userData = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      

  
    }
  
      console.log("information submitted")
      
  });

  document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("login-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission if validation fails

        let isValid = true;
        
        function showError(id, message) {
            document.getElementById(id).innerText = message;
        }

        function clearErrors() {
            document.querySelectorAll(".error").forEach(el => el.innerText = "");
        }

        clearErrors();

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

        if (isValid) {
            alert("Login form submitted successfully!");
            this.submit(); // Submit the form if all validations pass
        }
    });
});
