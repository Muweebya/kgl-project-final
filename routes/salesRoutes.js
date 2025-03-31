const express = require("express");

const router = express.Router();
//import models
const sales = require("../models/Sale");

router.get("/addSale", (req,res) =>{
    res.render("sales")
})

router.post("/addSale", (req,res) =>{ 
    try{
        const user = new sale(req.body);
        sale.save()
        console.log(sale)
        res.redirect("/sales/addSale")
    }catch (error) {
        res.status(400).render("sales");
        console.log(error);



    }

    
});

module.exports = router;