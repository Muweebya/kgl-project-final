const express = require("express");

const router = express.Router();
//import models
const Sale = require("../models/Sale");

router.get("/addSale", (req,res) =>{
    res.render("sales")
})

router.post("/addSale", async (req,res) =>{ 
    try{
        const newSale = new Sale(req.body);
        await newSale.save();
        console.log(newSale);
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

router.get("/updateSale/:id", async(req,res) => {
try{
    const updateSale = await Sale.findOne({_id:req.params.id});
    res.render("updatesale", {sale:updateSale});
}catch(error){
    res.status(400).send("Unable to find items in the database")
}
})
router.post("/updateSale", async(req,res) => {
    try{
      // Use your existing variable name
      const updateSale = await Sale.findOneAndUpdate(
        {_id: req.query.id},
        req.body,
        {new: true}
      );
      
      // Add logging to check if update is successful
      console.log("Updated sale:", updateSale);
      
      // Use absolute path for redirect
      res.redirect("/sales/salesList");
    }catch(error){
      console.log("Update error:", error);
      res.status(400).send("Unable to update item in the database")
    }
  })
  router.post("/deleteSale", async(req,res) => {
    try{
     await Sale.deleteOne({_id:req.body.id})
        res.redirect("back")
    }catch(error){
        res.status(400).send("Unable to delete item in the database")
    }
  })
  router.get("/salesList", isAuthenticated, async (req, res) => {
    try {
        const branch = req.user.branch; // e.g., "Matugga"

        // Only show data from the user's branch
        const saleslist = await Sale.find({ branch });

        res.render("salesList", { saleslist, branch });
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to load sales");
    }
});


module.exports = router;