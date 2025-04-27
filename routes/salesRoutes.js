const express = require("express");
const router = express.Router();

// Import models
const Sale = require("../models/Sale");
const Produce = require("../models/Procurement");

// Authentication middleware
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/register/login');
};

// Add new sale form route
router.get("/addSale/:id", isAuthenticated, async (req, res) => {
  if (req.session.user.role === "salesagent" || req.session.user.role === "manager") {
    try {
      const produce = await Produce.findById(req.params.id);
      console.log("my produce.......", produce);
      res.render("sales", { produce, currentUser: req.session.user });
    } catch (error) {
      console.error('Error rendering sales page:', error);
      res.status(400).send('Unable to find item in the database');
    }
  } else {
    res.send("You are not allowed to access this page");
  }
});

// Submit new sale
router.post("/addSale/:id", isAuthenticated, async (req, res) => {
  if (req.session.user.role === "salesagent" || req.session.user.role === "manager") {
    try {
      const { tonnage } = req.body;
      const produce = await Produce.findById(req.params.id);

      if (!produce) {
        return res.status(404).send("Produce not found");
      }

      if (produce.tonnage < tonnage) {
        return res
          .status(400)
          .send(`Not enough tonnage in stock, there are ${produce.tonnage}kg in stock`);
      }
    if (produce && produce.tonnage > 0) {
      const saleMade = new Sale({
        producename: req.body.producename,
        buyersname:req.body.buyersname,
        dateandtime:req.body.dateandtime,
        tonnage:req.body.tonnage,
        amountpaid:req.body.amountpaid,
        salesagent:req.body.salesagent,
        paymentmethod:req.body.paymentmethod,
        branch: req.body.branch,
        
      });

      await saleMade.save();

      // Decrease the tonnage of produce
      produce.tonnage -= tonnage;
      console.log("New tonnage after sale:", produce.tonnage);
      await produce.save();

      res.redirect("/sales/salesList");
    }else{
      return res.status(404).json({error: 'Produce not found or sold out'});
    }
    } catch (error) {
      console.error("Error processing sale:", error);
      res.status(400).send("Failed to add sale");
    }
  } else {
    res.send("You are not allowed to perform this action");
  }
});

// Add a completely new sale (without produce ID)
router.post("/addSale/:id", isAuthenticated, async (req, res) => {
  try {
    const newSale = new Sale(req.body);
    await newSale.save();
    console.log("New sale added:", newSale);
    res.redirect("/sales/salesList");
  } catch (error) {
    console.error("Error adding sale:", error);
    res.status(400).render("sales", {
      error: "Failed to add sale",
      formData: req.body
    });
  }
});

// Display list of sales
router.get("/salesList", isAuthenticated, async (req, res) => {
  try {
    if (req.user && req.user.branch) {
      const branch = req.user.branch;
      const items = await Sale.find({ branch }).sort({ $natural: -1 }).populate("producename").populate("salesagent")
      // Populate the 'prodname' field with the corresponding Produce document/ all details of produce are extracted
.
      res.render("salesList", { sales: items, branch });
    } else {
      const items = await Sale.find().sort({ $natural: -1 });
      res.render("salesList", { sales: items });
    }
  } catch (error) {
    console.error("Error fetching sales list:", error);
    res.status(400).render("error", { message: "Unable to find items in the database" });
  }
});

// Display update sale form
router.get("/updateSale/:id", isAuthenticated, async (req, res) => {
  try {
    const updateSale = await Sale.findById(req.params.id);
    if (!updateSale) {
      return res.status(404).render("error", { message: "Sale not found" });
    }
    res.render("updatesale", { sale: updateSale });
  } catch (error) {
    console.error("Error finding sale to update:", error);
    res.status(400).render("error", { message: "Unable to find item in the database" });
  }
});

// Submit update sale form
router.post("/updateSale/:id", isAuthenticated, async (req, res) => {
  try {
    console.log("Update sale request received for ID:", req.query.id);
    console.log("Update data:", req.body);

    const updateSale = await Sale.findByIdAndUpdate(
      req.query.id,
      req.body,
      { new: true }
    );

    if (!updateSale) {
      return res.status(404).render("error", { message: "Sale not found for update" });
    }

    console.log("Updated sale:", updateSale);
    res.redirect("/sales/salesList");

  } catch (error) {
    console.error("Update error:", error);
    res.status(400).render("error", { message: "Unable to update item in the database" });
  }
});

// Delete sale
router.post("/deleteSale", isAuthenticated, async (req, res) => {
  try {
    const result = await Sale.deleteOne({ _id: req.body.id });

    if (result.deletedCount === 0) {
      console.log("No sale found to delete");
    } else {
      console.log("Sale deleted successfully");
    }

    res.redirect("back");

  } catch (error) {
    console.error("Delete error:", error);
    res.status(400).render("error", { message: "Unable to delete item in the database" });
  }
});

module.exports = router;
