var t;
var data;



// const patientSchema={
//     pname:String,
//     dname:String,
//     time:String
// }
// const Patient=mongoose.model("Patient",patientSchema);



// const p1=new Patient({
//     pname:"Bittu",
//     dname:"Bhavna",
//     time:"12:00pm"
// })

// const p2=new Patient({
//     pname:"B",
//     dname:"Bhavna",
//     time:"12:00pm"
// })
// const p3=new Patient({
//     pname:"c",
//     dname:"Bhavna",
//     time:"12:00pm"
// })
// const patients=[p1,p2,p3];
// Patient.insertMany(patients,function(err){
//     if(!err){console.log("saved")}
// })
function selectedTime(event){
    console.log(event.target.value);
    t=event.target.value;
}
function show() {
    var rowId = 
        event.target.parentNode.parentNode.id;
  //this gives id of tr whose button was clicked
     data = 
document.getElementById(rowId).querySelectorAll(".row-data"); 
  /*returns array of all elements with 
  "row-data" class within the row with given id*/

    var name = data[0].innerText;
    var s = data[1].innerText;
    // $.post("/request",
    // {
    //    dname: name,
    //    ta: t
    // },
    // function (data, status) {
    //    console.log(data);
    // });
    fetch("/request", {
     
    // Adding method type
    method: "POST",
     
    // Adding body or contents to send
    body: JSON.stringify({
        dname: name,
        ap: t,
        
        
    }),
     
    // Adding headers to the request
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})
 
// Converting to JSON
.then(response => response.json())
.then(json => console.log(json));
fetch("/appointmentHistory", {
     
    // Adding method type
    method: "POST",
     
    // Adding body or contents to send
    body: JSON.stringify({
        dname: name,
        ap: t,
        specialist:s
        
    }),
     
    // Adding headers to the request
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})
 
// Converting to JSON
.then(response => response.json())
 
// Displaying results to console

 
// Displaying results to console
.then(json => console.log(json));

//    alert("Name: " + name + "\nAge: " + s);
}

// Getting the table element
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
// export {data};
