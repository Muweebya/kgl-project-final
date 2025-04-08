const express = require("express");

const router = express.Router();
//import models
const Produce = require("../models/Procurement");

router.get("/addProduct", (req,res) =>{
    res.render("procurement");
})

router.post("/addProduct", async (req,res) =>{ 
    try{
        const newProduce = new Produce(req.body);
        await newProduce.save();
        console.log(newProduce);
        res.redirect("/procurement/procuredProduceList")
    }catch (error) {
        res.status(400).render("procurement");
        console.log(error);



    }

    
});
//getting sales from db to form
router.get("/procuredProduceList", async(req,res) => {
    try{
        const products = await Produce.find().sort({$natural:-1});;
        res.render("procuredProduceList", {
            procuredProduce:products
        })
    }catch(error){
        res.status(400).send("Unable to find produce in the database")
    }
    
})
router.get("/updateProduct/:id", async(req,res) => {
try{
    const updateProduct = await Produce.findOne({_id:req.params.id});
    res.render("updateproduce", {produce:updateProduct});
}catch(error){
    res.status(400).send("Unable to find items in the database")
}
})
router.post("/updateProduct", async(req,res) => {
    try{
      // Use your existing variable name
      const updateProduct = await Produce.findOneAndUpdate(
        {_id: req.query.id},
        req.body,
        {new: true}
      );
      
      // Add logging to check if update is successful
      console.log("Updated product:", updateProduct);
      
      // Use absolute path for redirect
      res.redirect("/procurement/procuredProduceList");
    }catch(error){
      console.log("Update error:", error);
      res.status(400).send("Unable to update item in the database")
    }
  })



module.exports = router;
//localhost:3001/procurement/addProduct

