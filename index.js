const express = require("express");
const app = express();
/* const mongoose = require("mongoose");
const myRoutes = require("./routes/myRoutes") */
const port = 80
/* const cookieParser = require("cookie-parser");
app.use(cookieParser()); 
const bodyParser = require("body-parser") */
/* const URL = process.env.URL */
/* const URL = "mongodb+srv://user4:1234@cluster0.nvyxm.mongodb.net/productDB?retryWrites=true&w=majority"


app.use(bodyParser.urlencoded({extended:true}))
mongoose.connect(URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log("We are connected to the db via port", port);
})
.catch((err)=>{
    console.log(err);
}) */
app.get("/",(req,res)=>{
    res.send("saad page")
})

/* 
app.set("view engine","ejs")
app.set("views",__dirname+"/views")




app.use("/", myRoutes);  */

app.listen(port, ()=>{
    console.log("Hell with the server");
})

