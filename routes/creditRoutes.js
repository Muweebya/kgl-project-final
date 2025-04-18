const express = require("express");

const router = express.Router();
//import models
const Credit = require("../models/Credit");

router.get("/addCreditor", (req,res) =>{
    res.render("credit");
})

router.post("/addCreditor", async (req,res) =>{ 
    try{
        const newCredit = new Credit(req.body);
        await newCredit.save();
        console.log(newCredit);
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
router.get("/updateCreditor/:id", async(req,res) => {
try{
    const updateCredit = await Credit.findOne({_id:req.params.id});
    res.render("updatecredit", {creditor:updateCredit});
}catch(error){
    res.status(400).send("Unable to find creditor in the database")
}
})
router.post("/updateCreditor", async(req,res) => {
    try{
      // Use your existing variable name
      const updateCredit = await Credit.findOneAndUpdate(
        {_id: req.query.id},
        req.body,
        {new: true}
      );
      
      // Add logging to check if update is successful
      console.log("Updated creditor:", updateCredit);
      
      // Use absolute path for redirect
      res.redirect("/credit/creditorsList");
    }catch(error){
      console.log("Update error:", error);
      res.status(400).send("Unable to update creditor in the database")
    }
  })

  router.post("/deleteCreditor", async(req,res) => {
    try{
     await Credit.deleteOne({_id:req.body.id})
        res.redirect("back")
    }catch(error){
        res.status(400).send("Unable to delete creditor in the database")
    }
  })

  router.get("/creditorsList", isAuthenticated, async (req, res) => {
    try {
        const branch = req.user.branch; // e.g., "Matugga"

        // Only show data from the user's branch
        const creditlist = await Credit.find({ branch });

        res.render("creditorsList", { creditlist, branch });
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to load creditors");
    }
});

module.exports = router;