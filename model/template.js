const mongoose = require("mongoose");

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