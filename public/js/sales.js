document.addEventListener("DOMContentLoaded", function () {
    let salesForm = document.getElementById("sales-form");

    salesForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission if validation fails

        let isValid = true;
        
        function showError(id, message) {
            const errorElement = document.getElementById(id);
            if (errorElement) {
                errorElement.innerText = message;
            }
        }

        function clearErrors() {
            document.querySelectorAll(".error").forEach(el => el.innerText = "");
        }

        clearErrors();

        // Get form values and validate
        let produceName = document.getElementById("produceName").value.trim();
        if (!produceName) {
            showError("nameError", "Name of produce is required.");
            isValid = false;
        }

        let buyersName = document.getElementById("buyersName").value.trim();
        if (!/^[A-Za-z0-9 ]{2,}$/.test(buyersName)) {
            showError("buyerError", "Buyer name must be alphanumeric and at least 2 characters.");
            isValid = false;
        }

        let dateTime = document.getElementById("dateTime").value.trim();
        if (!dateTime) {
            showError("dateError", "Date is required.");
            isValid = false;
        }

        let tonnage = document.getElementById("tonnage").value.trim();
        if (!/^[0-9]+$/.test(tonnage) || tonnage < 1) {
            showError("tonnageError", "Tonnage must be a positive number.");
            isValid = false;
        }

        let cost = document.getElementById("cost").value.trim();
        if (!/^[0-9]{4,}$/.test(cost)) {
            showError("amountError", "Amount paid must be numeric and at least 4 digits.");
            isValid = false;
        }

        let salesAgentName = document.getElementById("salesAgentName").value.trim();
        if (!/^[A-Za-z0-9 ]{2,}$/.test(salesAgentName)) {
            showError("agentError", "Sales agent name must be alphanumeric and at least 2 characters.");
            isValid = false;
        }

        let paymentMethod = document.getElementById("paymentMethod").value.trim();
        if (!paymentMethod) {
            showError("paymentError", "Payment method is required.");
            isValid = false;
        }

        let branch = document.getElementById("branch").value.trim();
        if (!branch) {
            showError("branchError", "Branch is required.");
            isValid = false;
        }

        if (isValid) {
            console.log("Sale update submitted successfully!");
            // Remove the event listener to prevent infinite loops
            salesForm.removeEventListener("submit", arguments.callee);
            salesForm.submit(); // Now submit the form
        }
    });
});