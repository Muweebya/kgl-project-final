let form = document.getElementById("procurementForm");

//let tableBod = document.getElementById("procuredTable").getElementsByTagName("tbody")[0];

let tableBody = document.querySelector("#procuredTable tbody")

// element.addEventListener("event", function)

form.addEventListener("submit", function(event){
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


/* This is an attempt

const loginData = {
    email: document.getElementById("emailAddress").value,
    password: document.getElementById("passKey").value
} */