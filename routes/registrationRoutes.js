const express = require("express");

const router = express.Router();
//import models
const registration = require("../models/Register");

router.get("/register", (req,res) =>{
    res.render("registration")
})

router.post("/register", (req,res) =>{ 
    try{
        const user = new registration(req.body);
        user.save()
        console.log(user)
        res.redirect("/registration/register")
    }catch (error) {
        res.status(400).render("registration");
        console.log(error);



    }

    
});

module.exports = router;