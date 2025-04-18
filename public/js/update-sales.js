document.addEventListener("DOMContentLoaded", function () {
    let creditForm = document.getElementById("credit-form");

    creditForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission temporarily

        let isValid = true;

        function showError(id, message) {
            const errorElement = document.getElementById(id);
            if (errorElement) {
                errorElement.innerText = message;
            }
        }

        function clearErrors() {
            document.querySelectorAll("[id$='Error']").forEach(el => el.innerText = "");
        }

        clearErrors();

        // Validate fields
        let buyerName = document.getElementById("buyername").value.trim();
        if (!/^[A-Za-z0-9 ]{2,}$/.test(buyerName)) {
            showError("buyerError", "Buyer name must be alphanumeric and at least 2 characters.");
            isValid = false;
        }

        let nationalid = document.getElementById("nationalid").value.trim();
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
            showError("contactError", "Enter a valid phone number (10–15 digits).");
            isValid = false;
        }

        let amountdue = document.getElementById("amountdue").value.trim();
        if (!/^[0-9]{5,}$/.test(amountdue)) {
            showError("amountError", "Amount due must be numeric and at least 5 digits.");
            isValid = false;
        }

        let salesAgentName = document.getElementById("salesAgentName").value.trim();
        if (!/^[A-Za-z0-9 ]{2,}$/.test(salesAgentName)) {
            showError("agentError", "Sales agent name must be at least 2 characters.");
            isValid = false;
        }

        let duedate = document.getElementById("duedate").value;
        if (!duedate) {
            showError("dueDateError", "Due date is required.");
            isValid = false;
        }

        let produceName = document.getElementById("produceName").value;
        if (produceName === "" || produceName === "Select Produce") {
            showError("produceError", "Select a produce name.");
            isValid = false;
        }

        let typeofproduce = document.getElementById("typeofproduce").value;
        if (typeofproduce === "" || typeofproduce === "Select Type of Produce") {
            showError("typeError", "Select a type of produce.");
            isValid = false;
        }

        let tonnage = document.getElementById("tonnage").value;
        if (!/^[0-9]+$/.test(tonnage) || tonnage < 1) {
            showError("tonnageError", "Tonnage must be a positive number.");
            isValid = false;
        }

        let dateofdispatch = document.getElementById("dateofdispatch").value;
        if (!dateofdispatch) {
            showError("dispatchDateError", "Dispatch date is required.");
            isValid = false;
        }

        if (isValid) {
            // Submit the form if all validations pass
            creditForm.submit();
        }
    });
});