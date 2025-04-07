const express = require("express");

const router = express.Router();
//import models
const Sale = require("../models/Sale");

router.get("/addSale", (req,res) =>{
    res.render("sales")
})

router.post("/addSale", async (req,res) =>{ 
    try{
        const sale = new sale(req.body);
        await sale.save()
        console.log(sale)
        res.redirect("/sales/salesList")
    }catch (error) {
        res.status(400).render("sales");
        console.log(error);



    }

    
});
//getting sales from db to form
router.get("/salesList", async(req,res) => {
    try{
        const items = await Sale.find().sort({$natural:-1});;
        res.render("salesList", {
            sales:items
        })
    }catch(error){
        res.status(400).send("Unable to find items in the database")
    }
    
})

module.exports = router;