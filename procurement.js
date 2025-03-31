let procurementForm = document.getElementById("procurementForm");

//let tableBod = document.getElementById("procuredTable").getElementsByTagName("tbody")[0];

let tableBody = document.querySelector("#procuredTable tbody")

// element.addEventListener("event", function)

procurementForm.addEventListener("submit", function(event){
  event.preventDefault()

  // Get form values
  const produceData = {
    produceName: document.getElementById("produceName").value,
    produceType: document.getElementById("produceType").value,
    dateTime: document.getElementById("dateTime").value,
    tonnage: document.getElementById("tonnage").value,
    cost: document.getElementById("cost").value,
    dealerName: document.getElementById("dealerName").value,
    branchName: document.getElementById("branchName").value,
    contact: document.getElementById("contact").value,
    priceToSell: document.getElementById("priceToSell").value

  }

    console.log("information submitted")
    
});


document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("procurementForm").addEventListener("submit", function (event) {
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

      let produceType = document.getElementById("produceType").value.trim();
      if (!/^[A-Za-z]{2,}$/.test(type)) {
          showError("typeError", "Type must contain only alphabets and be at least 2 characters.");
          isValid = false;
      }

      let dateTime = document.getElementById("dateTime").value.trim();
      if (!dateTime) {
          showError("dateError", "Date is required.");
          isValid = false;
      }


      let tonnage = document.getElementById("tonnage").value.trim();
      if (!/^[0-9]{3,}$/.test(tonnage)) {
          showError("tonnageError", "Tonnage must be numeric and at least 3 digits.");
          isValid = false;
      }

      let cost = document.getElementById("cost").value.trim();
      if (!/^[0-9]{5,}$/.test(cost)) {
          showError("costError", "Cost must be numeric and at least 5 digits.");
          isValid = false;
      }

      let dealerName = document.getElementById("dealerName").value.trim();
      if (!/^[A-Za-z0-9]{2,}$/.test(dealerName)) {
          showError("dealerError", "Dealer name must be alphanumeric and at least 2 characters.");
          isValid = false;
      }

      let contact = document.getElementById("contact").value.trim();
      if (!/^\+?[0-9]{10,15}$/.test(contact)) {
          showError("contactError", "Enter a valid phone number (10 digits, optional + sign).");
          isValid = false;
      }

      let priceToSell = document.getElementById("priceToSell").value.trim();
      if (!priceToSell || isNaN(priceToSell)) {
          showError("priceError", "Enter a valid selling price.");
          isValid = false;
      }

      if (isValid) {
          alert("Form submitted successfully!");
          this.submit(); // Submit the form if all validations pass
      }
  });
});
