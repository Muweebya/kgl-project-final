let salesForm = document.getElementById("sales-form");

//let tableBod = document.getElementById("procuredTable").getElementsByTagName("tbody")[0];

let tableBody = document.querySelector("#procuredTable tbody")

// element.addEventListener("event", function)

salesForm.addEventListener("submit", function(event){
  event.preventDefault()

  // Get form values
  const salesData = {
    produceName: document.getElementById("produceName").value,
    buyersName: document.getElementById("buyer'sName").value,
    dateTime: document.getElementById("dateTime").value,
    tonnage: document.getElementById("tonnage").value,
    amountPaid: document.getElementById("amountPaid").value,
    salesAgentName: document.getElementById("salesAgentName").value,
   

  }

    console.log("information submitted")
    
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("sales-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission if validation fails

        let isValid = true;
        
        function showError(id, message) {
            document.getElementById(id).innerText = message;
        }

        function clearErrors() {
            document.querySelectorAll(".error").forEach(el => el.innerText = "");
        }

        clearErrors();

        let produceName = document.getElementById("produceName").value.trim();
        if (!produceName) {
            showError("nameError", "Name of produce is required.");
            isValid = false;
        }

        let tonnage = document.getElementById("tonnage").value.trim();
        if (!/^[0-9]+$/.test(tonnage) || tonnage < 1) {
            showError("tonnageError", "Tonnage must be a positive number.");
            isValid = false;
        }

        let amountPaid = document.getElementById("amountPaid").value.trim();
        if (!/^[0-9]{5,}$/.test(amountPaid)) {
            showError("amountError", "Amount paid must be numeric and at least 5 digits.");
            isValid = false;
        }

        let buyersName = document.getElementById("buyer'sName").value.trim();
        if (!/^[A-Za-z0-9]{2,}$/.test(buyersName)) {
            showError("buyerError", "Buyer name must be alphanumeric and at least 2 characters.");
            isValid = false;
        }

        let salesAgentName = document.getElementById("salesAgentName").value.trim();
        if (!/^[A-Za-z0-9]{2,}$/.test(salesAgentName)) {
            showError("agentError", "Sales agent name must be alphanumeric and at least 2 characters.");
            isValid = false;
        }

        let dateTime = document.getElementById("dateTime").value.trim();
        if (!dateTime) {
            showError("dateError", "Date is required.");
            isValid = false;
        }

        

        if (isValid) {
            alert("Sales record submitted successfully!");
            this.submit(); // Submit the form if all validations pass
        }
    });
});
