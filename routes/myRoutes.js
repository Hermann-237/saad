
const express = require("express");
const controller = require("../controller/controller");
const router = express.Router(); 
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended:false});

router.get("/homepage", controller.homepage)
router.get("/form",controller.form);
router.post("/form", urlencodedParser, controller.submit)
router.get("/authentication", controller.check1);
router.post("/authentication", urlencodedParser, controller.check2)
router.get("/showDB",controller.verifyJWT,controller.show);

module.exports = router; 


// Additional Notes: 
// 1. When a client uses GET method, "req.params" stores the data in the request
// 2. When a client uses POST method, "req.body" stores the data in the request
// So if I want to create a button that does some function on click, like delete button to remove the entries then a) create the button first b) inside the button tag, create an "a href" tag with the route c) go to the myRoutes and add that route there with GET or POST method d) In the controller, make the function 