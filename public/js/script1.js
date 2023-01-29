var tables = document
    .getElementsByTagName("tr");

// Looping over tables
for (var i = 0; i < tables.length; i++) {

    // Get the ith table
    var table = tables[i];

    // Set the id dynamically
    table.setAttribute("id", i + 1);

    // The line below will also give id
    // dynamically to the tables
    //table.id = i+1;
}
function show() {
    var rowId = 
        event.target.parentNode.parentNode.id;
        
  //this gives id of tr whose button was clicked
     var data = 
document.getElementById(rowId).querySelectorAll(".row-data"); 
console.log(data[0].innerText);
alert("Your have cancelled the appointment.Please refresh the page to see the changes.")
fetch("/deleteAppointment", {
     
  // Adding method type
  method: "POST",
   
  // Adding body or contents to send
  body: JSON.stringify({
      dname: data[0].innerText,
      
      
      
  }),
   
  // Adding headers to the request
  headers: {
      "Content-type": "application/json; charset=UTF-8"
  }
})

// Converting to JSON
.then(response => response.json())
.then(json => console.log(json));
    
}

