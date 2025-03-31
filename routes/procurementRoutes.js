const express = require("express");
const router = express.Router();

router.get("/addProduct", (req,res) =>{
    res.render("procurement")
    
    
});


router.post("/addProduct", (req,res) => {
    console.log(req.body)
    res.redirect("/procurement/addProduct")
});

router.get("/getProducts", (req,res) =>{
    res.send("This is the list of products")
});


module.exports = router;
//localhost:3001/procurement/addProduct

