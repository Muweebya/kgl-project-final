let creditForm = document.getElementById("credit-form");

//let tableBod = document.getElementById("procuredTable").getElementsByTagName("tbody")[0];

let tableBody = document.querySelector("#salestable tbody")

// element.addEventListener("event", function)

creditForm.addEventListener("submit", function(event){
  event.preventDefault()

  // Get form values
  const creditData = {
    buyerName: document.getElementById("buyerName").value,
    nationalid: document.getElementById("nationalid").value,
    location:document.getElementById("location").value,
    duedate: document.getElementById("duedate").value,
    tonnage: document.getElementById("tonnage").value,
    amountdue: document.getElementById("amountdue").value,
    produceName: document.getElementById("produceName").value,
    typeofproduce: document.getElementById("typeofproduce").value,
    contact: document.getElementById("contact").value,
    salesAgentName: document.getElementById("salesAgentName").value,
    dateofdispatch: document.getElementById("dateofdispatch").value,

  }

    console.log("information submitted")
    
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("credit-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission if validation fails

        let isValid = true;
        
        function showError(id, message) {
            document.getElementById(id).innerText = message;
        }

        function clearErrors() {
            document.querySelectorAll(".error").forEach(el => el.innerText = "");
        }

        clearErrors();

        let buyerName = document.getElementById("buyerName").value.trim();
        if (!/^[A-Za-z0-9]{2,}$/.test(buyerName)) {
            showError("buyerError", "Buyer name must be alphanumeric and at least 2 characters.");
            isValid = false;
        }

        let nationalid  = document.getElementById("nationalid").value.trim();
        if (!/^C[A-Z0-9]{13}$/.test(nationalid)) {
            showError("ninError", "Enter a valid National ID (e.g., CXXXXXXXXXXXXX).");
            isValid = false;
        }

        let location = document.getElementById("location").value.trim();
        if (!/^[A-Za-z0-9 ]{2,}$/.test(location)) {
            showError("locationError", "Location must be at least 2 characters.");
            isValid = false;
        }

        let contact = document.getElementById("contact").value.trim();
        if (!/^\+?[0-9]{10,15}$/.test(contact)) {
            showError("contactError", "Enter a valid phone number (10-15 digits, optional + sign).");
            isValid = false;
        }

        let amountdue = document.getElementById("amountdue").value.trim();
        if (!/^[0-9]{5,}$/.test(amountdue)) {
            showError("amountError", "Amount due must be numeric and at least 5 digits.");
            isValid = false;
        }

        let salesAgentName = document.getElementById("salesAgentName").value.trim();
        if (!/^[A-Za-z0-9]{2,}$/.test(salesAgentName)) {
            showError("agentError", "Sales agent name must be alphanumeric and at least 2 characters.");
            isValid = false;
        }

        let duedate = document.getElementById("duedate").value.trim();
        if (!duedate) {
            showError("dueDateError", "Due date is required.");
            isValid = false;
        }

        let produceName = document.getElementById("produceName").value.trim();
        if (!/^[A-Za-z0-9]{2,}$/.test(produceName)) {
            showError("produceError", "Produce name must be alphanumeric and at least 2 characters.");
            isValid = false;
        }

        let typeofproduce = document.getElementById("typeofproduce").value.trim();
        if (!/^[A-Za-z]{2,}$/.test(typeofproduce)) {
            showError("typeError", "Produce type must contain only letters and be at least 2 characters.");
            isValid = false;
        }

        let tonnage = document.getElementById("tonnage").value.trim();
        if (!/^[0-9]+$/.test(tonnage) || tonnage < 1) {
            showError("tonnageError", "Tonnage must be a positive number.");
            isValid = false;
        }

        let dateofdispatch = document.getElementById("dateofdispatch").value.trim();
        if(!dateofdispatch){
            showError("dispatchDateError", "Dispatch date is required.");
            isValid = false;
        }

        if (isValid) {
            alert("Credit sales record submitted successfully!");
            this.submit(); // Submit the form if all validations pass
        }
    });
});

