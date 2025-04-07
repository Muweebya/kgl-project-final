const express = require("express");

const router = express.Router();
//import models
const produce = require("../models/Procurement");

router.get("/addProduct", (req,res) =>{
    res.render("procurement")
})

router.post("/addProduct", async (req,res) =>{ 
    try{
        const produce = new produce(req.body);
        await produce.save()
        console.log(produce)
        res.redirect("/procurement/procuredProduceList")
    }catch (error) {
        res.status(400).render("produce");
        console.log(error);



    }

    
});
//getting sales from db to form
router.get("/procuredProduceList", async(req,res) => {
    try{
        const products = await produce.find().sort({$natural:-1});;
        res.render("procuredProduceList", {
            produce:products
        })
    }catch(error){
        res.status(400).send("Unable to find produce in the database")
    }
    
})


module.exports = router;
//localhost:3001/procurement/addProduct

