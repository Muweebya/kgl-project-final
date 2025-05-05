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
  res.redirect('/login');
};

// Add new sale form route
router.get("/addSale", isAuthenticated, async (req, res) => {
  if (req.user.role === "salesagent" || req.user.role === "manager") {
    try {
      const branch = req.user.branch;
      const products = await Produce.find({ branch }).sort({ $natural: -1 });
    
      console.log("my produce.......", products);
      res.render("sales", { 
        products, 
        currentUser: req.user,
         
      });
    } catch (error) {
      console.error('Error rendering sales page:', error);
      res.status(400).send('Unable to find item in the database');
    }
  } else {
    res.send("You are not allowed to access this page");
  }
});

// Submit new sale
router.post("/addSale", isAuthenticated, async (req, res) => {
  if (req.user.role === "salesagent" || req.user.role === "manager") {
    try {
      const { tonnage, producename } = req.body;
      const produce = await Produce.findById(producename);

      if (!produce) {
        return res.status(404).render("sales", { 
          error: "Produce not found",
          products: await Produce.find({ branch: req.user.branch }).sort({ $natural: -1 }),
          currentUser: req.user
        });
      }

      if (produce.tonnage < tonnage) {
        return res.status(400).render("sales", { 
          error: `Not enough tonnage in stock, there are ${produce.tonnage}kg in stock`,
          products: await Produce.find({ branch: req.user.branch }).sort({ $natural: -1 }),
          currentUser: req.user
        });
      }
      
      const saleMade = new Sale({
        producename: producename,
        buyersname: req.body.buyersname,
        dateandtime: req.body.dateandtime,
        tonnage: tonnage,
        amountpaid: req.body.amountpaid,
        salesagent: req.user._id,
        paymentmethod: req.body.paymentmethod,
        branch: req.user.branch,
      });

      await saleMade.save();

      // Decrease the tonnage of produce
      produce.tonnage -= tonnage;
      await produce.save();

      res.redirect("/sales/salesList");
    } catch (error) {
      console.error("Error processing sale:", error);
      res.status(400).render("sales", { 
        error: "Failed to add sale. Please try again.",
        products: await Produce.find({ branch: req.user.branch }).sort({ $natural: -1 }),
        currentUser: req.user
      });
    }
  } else {
    res.status(403).send("You are not allowed to perform this action");
  }
});

// Display list of sales
router.get("/salesList", isAuthenticated, async (req, res) => {
  try {
    let query = {};
    
    if (req.user && req.user.branch && req.user.role != 'director') {
      query.branch = req.user.branch;
    }
    
    const items = await Sale.find(query)
      .sort({ $natural: -1 })
      .populate("producename")  // Populate the 'producename' field with the corresponding Produce document
      .populate("salesagent"); // Populate the 'salesagent' field
      
    res.render("salesList", { 
      sales: items, 
      branch: req.user ? req.user.branch : null,
      userRole: req.user.role
    });
  } catch (error) {
    console.error("Error fetching sales list:", error);
    res.status(400).render("error", { message: "Unable to find items in the database" });
  }
});

// Display update sale form
router.get("/updateSale", isAuthenticated, async (req, res) => {
  try {
    const saleId = req.query.id;
    if (!saleId) {
      return res.status(400).render("error", { message: "Sale ID is required" });
    }

    const updateSale = await Sale.findById(saleId)
      .populate("producename")
      .populate("salesagent");
      
    if (!updateSale) {
      return res.status(404).render("error", { message: "Sale not found" });
    }
    
    // Fetch produce from the same branch
    const products = await Produce.find({ branch: req.user.branch });
    
    res.render("updatesale", { 
      sale: updateSale,
      products,
      currentUser: req.user,
      error: null
    });
  } catch (error) {
    console.error("Error finding sale to update:", error);
    res.status(400).render("error", { message: "Unable to find item in the database" });
  }
});

// Submit update sale form
router.post("/updateSale", isAuthenticated, async (req, res) => {
  try {
    const saleId = req.query.id;
    if (!saleId) {
      return res.status(400).render("error", { message: "Sale ID is required" });
    }

    const { tonnage, producename } = req.body;
    const sale = await Sale.findById(saleId).populate("producename");
    
    if (!sale) {
      return res.status(404).render("error", { message: "Sale not found" });
    }

    const produce = await Produce.findById(producename);
    if (!produce) {
      return res.status(404).render("error", { message: "Produce not found" });
    }

    // Calculate tonnage difference
    const oldTonnage = sale.tonnage;
    const newTonnage = tonnage;
    const tonnageDiff = newTonnage - oldTonnage;

    // Check if there's enough produce in stock
    if (tonnageDiff > 0 && produce.tonnage < tonnageDiff) {
      return res.status(400).render("updatesale", {
        error: `Not enough tonnage in stock. There are ${produce.tonnage}kg available.`,
        sale: await Sale.findById(saleId).populate("producename").populate("salesagent"),
        products: await Produce.find({ branch: req.user.branch }),
        currentUser: req.user
      });
    }

    // Update the sale
    const updateSale = await Sale.findByIdAndUpdate(
      saleId,
      {
        ...req.body,
        salesagent: req.user._id,
        branch: req.user.branch
      },
      { new: true }
    );

    if (!updateSale) {
      return res.status(404).render("error", { message: "Sale not found for update" });
    }

    // Update produce tonnage
    produce.tonnage -= tonnageDiff;
    await produce.save();

    res.redirect("/sales/salesList");
  } catch (error) {
    console.error("Update error:", error);
    res.status(400).render("updatesale", {
      error: "Failed to update sale. Please try again.",
      sale: await Sale.findById(req.query.id).populate("producename").populate("salesagent"),
      products: await Produce.find({ branch: req.user.branch }),
      currentUser: req.user
    });
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
