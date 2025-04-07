const express = require("express");

const router = express.Router();
//import models
const Credit = require("../models/Credit");

router.get("/addCreditor", (req,res) =>{
    res.render("credit")
})

router.post("/addCreditor", async (req,res) =>{ 
    try{
        const credit = new credit(req.body);
        await credit.save()
        console.log(credit)
        res.redirect("/credit/creditorsList")
    }catch (error) {
        res.status(400).render("credit");
        console.log(error);



    }

    
});
//getting sales from db to form
router.get("/creditorsList", async(req,res) => {
    try{
        const buyers = await Credit.find().sort({$natural:-1});;
        res.render("creditorsList", {
            creditors:buyers
        })
    }catch(error){
        res.status(400).send("Unable to find creditors in the database")
    }
    
})

module.exports = router;