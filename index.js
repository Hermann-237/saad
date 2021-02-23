const express = require("express");
const app = express();
const mongoose = require("mongoose");
const myRoutes = require("./routes/myRoutes");
const dotenv = require("dotenv"); // DO NOT PUT A SEMICOLON AFTER THE ENV VARIABLE IN THE .ENV FILE
/* dotenv.config(); */
/* const port = process.env.PORT || 3000;  */
const port = 80
const cookieParser = require("cookie-parser");
app.use(cookieParser()); 
/* const URL = process.env.URL */
const URL = "mongodb+srv://test:Test@cluster0.mdani.mongodb.net/Practice?retryWrites=true&w=majority";



mongoose.connect(URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log("We are connected to the db via port", port);
})
.catch((err)=>{
    console.log(err);
})


//EJS bit
app.set("view engine", "ejs");

//Routes

app.use("/", myRoutes); 

app.listen(port, ()=>{
    console.log("Hell with the server");
})

/* URL = mongodb+srv://test:Test@cluster0.mdani.mongodb.net/Practice?retryWrites=true&w=majority
PORT = 80 */