const express = require("express");
const router = express.Router();

// Import models
const Sale = require("../models/Sale");

// Define authentication middleware
// This middleware checks if a user is logged in before allowing access
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/register/login'); // Redirect to login page if not authenticated
};

// Add new sale form route
router.get("/addSale", isAuthenticated, (req, res) => {
  res.render("sales");
});

// Submit new sale form route
router.post("/addSale", isAuthenticated, async (req, res) => { 
  try {
    const newSale = new Sale(req.body);
    await newSale.save();
    console.log("New sale added:", newSale);
    res.redirect("/sales/salesList");
  } catch (error) {
    console.error("Error adding sale:", error);
    res.status(400).render("sales", { 
      error: "Failed to add sale",
      formData: req.body // Pass back form data to preserve user input
    });
  }
});

// Display list of sales
router.get("/salesList", isAuthenticated, async (req, res) => {
  try {
    // Check if user has branch information (for branch filtering)
    if (req.user && req.user.branch) {
      const branch = req.user.branch;
      // Only show data from the user's branch
      const items = await Sale.find({ branch }).sort({ $natural: -1 });
      res.render("salesList", { 
        sales: items,
        branch: branch 
      });
    } else {
      // If no branch filtering needed, show all sales
      const items = await Sale.find().sort({ $natural: -1 });
      res.render("salesList", { 
        sales: items 
      });
    }
  } catch (error) {
    console.error("Error fetching sales list:", error);
    res.status(400).render("error", { 
      message: "Unable to find items in the database" 
    });
  }
});

// Display update sale form
router.get("/updateSale/:id", isAuthenticated, async (req, res) => {
  try {
    const updateSale = await Sale.findOne({ _id: req.params.id });
    if (!updateSale) {
      return res.status(404).render("error", { 
        message: "Sale not found" 
      });
    }
    res.render("updatesale", { sale: updateSale });
  } catch (error) {
    console.error("Error finding sale to update:", error);
    res.status(400).render("error", { 
      message: "Unable to find items in the database" 
    });
  }
});

// Submit update sale form
router.post("/updateSale", isAuthenticated, async (req, res) => {
  try {
    console.log("Update sale request received for ID:", req.query.id);
    console.log("Update data:", req.body);
    
    const updateSale = await Sale.findOneAndUpdate(
      { _id: req.query.id },
      req.body,
      { new: true }
    );
    
    if (!updateSale) {
      return res.status(404).render("error", { 
        message: "Sale not found for update" 
      });
    }
    
    // Add logging to check if update is successful
    console.log("Updated sale:", updateSale);
    
    // Use absolute path for redirect
    res.redirect("/sales/salesList");
  } catch (error) {
    console.error("Update error:", error);
    res.status(400).render("error", { 
      message: "Unable to update item in the database" 
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
    res.status(400).render("error", { 
      message: "Unable to delete item in the database" 
    });
  }
});

module.exports = router;