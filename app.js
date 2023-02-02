require('dotenv').config()
const express=require("express");
const bodyParser = require("body-parser");
const mongoose=require("mongoose");
const app=express();
const session = require('express-session');
const passport=require("passport");
const d = new Date();
let year = d.getFullYear();
const passportLocalMongoose=require("passport-local-mongoose");


 var g="";
 app.set('view engine', 'ejs');
 
 //create session
 app.use(session({

secret:process.env.SECRET,
resave:false,
saveUninitialized:false
 }));
 //initializing passport package
 app.use(passport.initialize());
 app.use(passport.session()); //passport deal with sessions
 
mongoose.set('strictQuery', false);
//setting mongoose connection
mongoose.connect("mongodb+srv://bhavna26:bhavna%40260602@cluster0.poobre8.mongodb.net/doctorsDB",{useNewUrlParser: true})
// mongoose.connect("mongodb://localhost:27017/doctorsDB",{useNewUrlParser: true});
//array for new patients
var newPatients=[];
//schema for doctor model
// const doctorSchema={
//     firstname:String,
//     password:String,
//     specialist:String,
//     gmeet:String

    
// }
const doctorSchema=new mongoose.Schema({
    
  //  password:String,
    specialist:String,
    gmeet:String

    
});
doctorSchema.plugin(passportLocalMongoose);
const Doctor=new mongoose.model("Doctor",doctorSchema);

//schema for new patient
// const newPatientSchema={
//     newName:String,
//     newPassword:String
// }
const newPatientSchema=new mongoose.Schema({
   // username:String,
   // password:String
})
newPatientSchema.plugin(passportLocalMongoose);

//mongoose model for new patient
const NewPatient=new mongoose.model("NewPatient",newPatientSchema);
// passport.use(NewPatient.createStrategy());
// passport.serializeUser(NewPatient.serializeUser());
// passport.deserializeUser(NewPatient.deserializeUser());
  //const NewPatient=mongoose.model("NewPatient",newPatientSchema);  
//   passport.use(Doctor.createStrategy(),NewPatient.createStrategy());
passport.use("doctorLocal",Doctor.createStrategy());
passport.use("patientLocal",NewPatient.createStrategy());
passport.serializeUser(function(user, done) { 
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    if(user!=null)
      done(null,user);
  });
// passport.serializeUser(Doctor.serializeUser(),NewPatient.serializeUser());
// passport.deserializeUser(Doctor.deserializeUser(),NewPatient.deserializeUser());
  
  //appointment schema
const appointmentSchema={
    dappoint:String,
    pappoint:String,
    dspecialist:String,
    t:String,
    gapt:String
}
//model for appointment 
const appointment=mongoose.model("Appointment",appointmentSchema);
//patient schema
const patientSchema={
    pname:String,
    dname:String,
    time:String
}
//array for appointments
const aps=[];
//mongoose model for patients who booked appointments
const Patient=mongoose.model("Patient",patientSchema);


//mongoose model for doctors who signed up
//const Doctor=mongoose.model("Doctor",doctorSchema);
//global variables used in some routes

var name_recieved="";
var designation_recieved="";
var googlemeet="";
const doctors=[];
const patients=[];
var item="";
var item1="";


app.use(bodyParser.urlencoded({extended: true}));//used for post requests
app.use(bodyParser.json());
app.use(express.static("public"));//for using static css js files
//home route
app.get("/",function(_req,res){
    res.render("home",{y:year});
})
//signInDoctor route
app.get("/signInDoctor",function(_req,res){
    res.render("signInDoctor");
})
// app.post("/signInDoctor",function(req,res){
//     item1=req.body.username; //doctor who signed in
//     res.redirect("/doctor");
// })
app.post("/signInDoctor",function(req,res){
    item1=req.body.username;
    const doctor=new Doctor({
        username:req.body.username,
        password:req.body.password
    })
    // req.login(doctor,function(err){
    //     if(err){console.log(err);}
    //     else{
    //         Doctor.authenticate("doctorLocal")(req,res,function(){
    //             res.redirect("/doctor");
    //         })
    //     }
    // })
    passport.authenticate("doctorLocal")(req,res,function(){
        
        req.login(doctor,function(err){
            res.redirect("/doctor");
        })

})
})

//signInPatient route
app.get("/signInPatient",function(req,res){
  //  inserting an array of new patients in new patients database 
    // NewPatient.find({},function(err,foundPatients){
    //     if(foundPatients.length==0){ //check condition for no repetation
    //         NewPatient.insertMany(newPatients,function(err){
    //             if(err)console.log(err);
    //             else console.log("saved successfully")
    //         })
    //         res.redirect("/signInPatient");

    //     }
       // else{
            res.render("signInPatient");    
        //}
  // })
    
 })
 app.post("/signInPatient",function(req,res){
    item=req.body.username;
    const p=new NewPatient({
        username:req.body.username,
        password:req.body.password
    })
    // req.login(p,function(err){
    //     if(err){console.log(err);}
    //     else{
    //         NewPatient.authenticate("patientLocal")(req,res,function(){
    //             console.log(req.session);
    //             res.redirect("/patient");
    //         })
    //     }
    // })
    passport.authenticate("patientLocal")(req,res,function(){
        
            req.login(p,function(err){
                res.redirect("/patient");
            })
    
    })
})
// app.post("/signInPatient",function(req,res){
// item=req.body.username;//patient who signed in
// res.redirect("/patient")
// })
// app.post("/signInPatient",function(req,res){
//     item=req.body.username;
//     const p=new NewPatient({
//         username:req.body.username,
//         password:req.body.password
//     })
    
//     req.login(p,function(err){
// if(err){console.log(err);}
// else{
//     NewPatient.authenticate("local")(req,res,function(){
//         console.log("patient authenticated")
//         res.redirect("/patient")
//     })
// }
//     })
// })
//sign up doctor route
app.get("/signUpDoctor",function(req,res){
    res.render("signUpDoctor")
})

// app.post("/signUpDoctor",function(req,res){
//  //creating new object to be inserted in doctors database
//     const d1=new Doctor({
//         firstname:req.body.firstname,
//         password:req.body.password,
//         specialist:req.body.specialist,
//         gmeet:req.body.glink
//     })
    
//     d1.save();
// res.redirect("/signInDoctor");
    
// })
app.post("/signUpDoctor",function(req,res){
    var newDoctor=new Doctor({username:req.body.username,specialist:req.body.specialist,gmeet:req.body.glink});

    Doctor.register(newDoctor,req.body.password,function(err,doctor){
        if(err){
            console.log(err);
            res.redirect("/signUpDoctor");
        }
        else{
            Doctor.authenticate("doctorLocal")(req,res,function(){
                res.redirect("/signInDoctor");
                console.log("authenticaton success")
            })
        }
    })
    
})
//sign up patient route
app.get("/signUpPatient",function (req, res) {

        res.render("signUpPatient");
    })
    // app.post("/signUpPatient",function(req,res){
    //     //creating new object to be inserted in new patients database
    //     const np1=new NewPatient({
    //         newName:req.body.firstName,
    //         newPassword:req.body.password
    //     })
    //     np1.save();
    //     res.redirect("/signInPatient");
    // })
    app.post("/signUpPatient",function(req,res){
        const np1=new NewPatient({
            username:req.body.username,
            
        })
        NewPatient.register(np1,req.body.password,function(err,patient){
            if(err){console.log(err);
            res.redirect("/signUpPatient")}
            else{
                NewPatient.authenticate("patientLocal")(req,res,function(){
                    console.log("patient authenticated");
            
                    res.redirect("/signInPatient")
                })
            }
        })
    })
    //landing page route for doctor
app.get("/doctor",function(req,res){
    //console.log(req.user);
    console.log(req.session);
    if(req.isAuthenticated()){
    //finding google meet link of the doctor who signed in

    Doctor.findOne({username:item1},function(err,ans){
        if(!err){
            googlemeet=ans.gmeet;
        }
    })
    console.log("authenticated")
    //rendering patient list for doctor who signed in
    Patient.find({dname:item1},function(err,docs){
        if(!err){console.log(docs)}
        res.render("doctorLanding",{drname:item1,pnames:docs,gmeetlink:googlemeet})
    })}
    else{console.log("unauthorised")
        res.redirect("/signInDoctor");}
    
})
app.get("/request",function(req,res){
    //inserting array of patients in patients database
    Patient.find({},function(err,foundPatients){
        if(foundPatients.length==0){ //check condition to avoid repeated entries
            Patient.insertMany(patients,function(err){
                if(!err){console.log("saved")}
            })
        }
          } )
})
//appointment history route for patients
app.get("/appointmentHistory",function(req,res){
    //finding appointments with sign in patient name and inserting array of aps in
     //appoinments database
     
    appointment.find({ pappoint:item},function(err,docs){
        console.log(docs)
        if(docs.length==0){
            if(aps.length!=0){
            appointment.insertMany(aps,function(err){
                if(!err){console.log("saved appointments")}
            })}
            res.redirect("/patient");
        }
        else{
            console.log(docs)
        res.render("appointmentHistory",{drnames:doctors,appoints:docs});}
    })
   
})
//route which receives patient details through client side
app.post("/request", (req, res) => {
  //patient object inserted in patients database
  
    const p1=new Patient({
        pname:item,
        dname:req.body.dname,
        time:req.body.ap
    })
    p1.save();
    res.redirect("/request")
   
 
 })
 
 //delete patients when clicked on delete appointment from appointment list of doctors
 app.post("/deletePatient",function(req,res){
    Patient.deleteOne({pname:req.body.pname},function(err){
        if(!err){
            console.log("deleted success")
        }
        res.redirect("/doctor");
    })
    for(var i=0;i<aps.length;i++){
        if(aps[i].dappoint==item1&&aps[i].pappoint==req.body.pname){
            var removedObject=aps.splice(i,1);
            removedObject=null;
            break;
        }}
   appointment.deleteOne({dappoint:item1,pappoint:req.body.pname},function(err){
    if(!err){console.log("deleted at patient side")}
   })
 })
 //delete from appointment History when clicked on delete appointments
 app.post("/deleteAppointment",function(req,res){
   for(var i=0;i<aps.length;i++){
    if(aps[i].dappoint==req.body.dname&&aps[i].pappoint==item){
        var removedObject=aps.splice(i,1);
        removedObject=null;
        break;
    }
   }
   
    appointment.deleteOne({dappoint:req.body.dname,pappoint:item},function(err){
        if(err){console.log(err)}
        else{
            res.redirect("/appointmentHistory")}
    })
    Patient.deleteOne({pname:item},function(err){
        if(!err){
            console.log("deleted at doctors side")
        }
    })
 })

 app.post("/appointmentHistory",function(req,res){
    //finding google meet link of sign in doctor and creating appoinment
    //object to be inserted in database of appointments
    Doctor.findOne({username:req.body.dname},function(err,ans){
        if(!err){
            g=ans.gmeet;
        }
    
    const a1=new appointment({
        dappoint:req.body.dname,
        pappoint:item,
        dspecialist:req.body.specialist,
        t:req.body.ap,
        gapt:g

    })
    a1.save();
    aps.push(a1);
    res.redirect("/appointmentHistory")})
  
 })

app.get("/patient",function(req,res){
    //inserting array of doctors in doctors database
   // console.log(req.isAuthenticated())
  // console.log(req)
  console.log(req.session);
    if(req.isAuthenticated()){
    Doctor.find({},function(_err,foundDoctors){
        
        if(foundDoctors.length==0){
            Doctor.insertMany(doctors,function(err){
                if(err)console.log(err);
                else console.log("saved successfully")
            })
            res.redirect("/patient");

        }
        else{

             res.render("patient",{dNames:foundDoctors,pname:item});}
    })
}
    else{
   console.log("not authenicated")
      res.redirect("/signInPatient")}
   
})
app.listen(3000,()=>{
    console.log("server started successfully");
})
