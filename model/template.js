const mongoose = require("mongoose");
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
})

const peopleSchema = new mongoose.Schema({
    ArticleNo : {
        type:String,
        required:true,
    },
   Name : {
       type: String,
       required: true,
   }
}, {collection:"practice"})

const people = mongoose.model("practice", peopleSchema); 

module.exports = {people}; 