const abc = require("../model/template");
const Joi = require("joi"); 
const bcrypt = require("bcrypt"); 
const jwt = require("jsonwebtoken");



const homepage = (req,res)=>{
    res.render("homepage"); 
}

const form = (req,res)=>{
    res.render("index"); 
}


// user registering here, with validation criteria 
function submit(req,res){

    const schema = Joi.object({
       /*  ArticleNo:Joi.string().regex(/^[a-zA-Z,. ]*$/).min(3).max(30).required() ,
        Name : Joi.string().trim().regex(/^[0-9,. ]*$/).max(10).required(), */

        ArticleNo: Joi.string().trim().regex(/^[a-zA-Z,0-9,.]*$/).max(10).required(),
        Name : Joi.string().regex(/^[a-zA-Z,. ]*$/).min(3).max(30).required(),
    })

    const validation = schema.validate(req.body);
    
    if(!validation.error){
        //If the data is validated, we check now whether the "user already exists" or not
        abc.people.find({ArticleNo:req.body.ArticleNo}, (err,data)=>{
            if(data.length==0){
                const form = (body)=>{
                    console.log(hash);
                    abc.people(body).save()
                    .then(()=>{
                        res.send("The form has been submitted")
                    })
                    .catch((err)=>{
                       
                        res.send("something went wrong here");
                    })
                }
                const hash = bcrypt.hashSync(req.body.Name,12);
                // the form always take an object as an argument
                form({ArticleNo:req.body.ArticleNo, Name:hash}); 
            }     
            
            else{
                res.send("User already exists")
            }
        })
    }
        
    else{
        res.send("validation error")
    }
}

// we now write a function for JWT Token verification, this verification will be done at the server side

const verifyJWT = (req,res,next)=>{
    
    const token = req.cookies.JWT; // Request coming from client with the token, sent before by the server as a response
    //DO NOT FORGET TO USE COOKIE PARSER IN THE SERVER FILE OTHERWISE TOKEN WOULD NOT APPEAR
    
    if(!token){
        res.send("We need a token first, so first register and login to get the Token");
    }
    else{
        jwt.verify(token,"secret",(err,decoded)=>{
            if(err){
                res.json({message: "wrong token"})
            }
            else{
                req.variableName = decoded.variableName;
                next(); 
            }
        })
    }

}


const check1 = (req,res)=>{
    res.render("check")
}
// authentication, by matching the hashed password and then generating a JWT Token at the server side and sending it as a response back to the client

const check2 = (req,res)=>{
      const user = {
      ArticleNo : req.body.ArticleNo,
      Name : req.body.Name 
      }

      abc.people.find({ArticleNo: req.body.ArticleNo}, (err,data)=>{
          if(err){
              console.log(err);
          }
          else{
              if(data.length==0){
                  res.send("user does not exist");
              }
              // the variable "hash" will now store the hashed password from the DB
              
              const hash = (data[0].Name);
              const valid = bcrypt.compareSync(req.body.Name, hash); 

              //creating the JWT Token if the hashed password matches 
               if(valid ==true){
                   const token = jwt.sign(user,"secret");
                   res.cookie("JWT", token);
                   res.send("all good")
                   
               }
               else{
                   res.send("not authorized"); 
               }
          }
      })
}


const show = (req,res)=>{
    abc.people.find({}, (err,data)=>{
        if(err){
            res.send("JWT Token??")
        }
        else{
            res.send(data);
        }
    })
}



module.exports = {form, submit,check1,check2,verifyJWT, show,homepage}; 