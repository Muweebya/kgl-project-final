let loginForm = document.getElementById("#login-form")
form.addEventListener("submit", function(event){
    event.preventDefault()
  
    
    const userData = {
      emailAddress: document.getElementById("email").value,
      password: document.getElementById("password").value,
      

  
    }
  
      console.log("information submitted")
      
  });