const express = require("express");
const router = express.Router();

// Import models
const Credit = require("../models/Credit");

// Define authentication middleware
// This middleware checks if a user is logged in before allowing access
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/register/login'); // Redirect to login page if not authenticated
};

// Add new creditor form route
router.get("/addCreditor", isAuthenticated, (req, res) => {
  res.render("credit");
});

// Submit new creditor form route
router.post("/addCreditor", isAuthenticated, async (req, res) => { 
  try {
    const newCredit = new Credit(req.body);
    await newCredit.save();
    console.log("New creditor added:", newCredit);
    res.redirect("/credit/creditorsList");
  } catch (error) {
    console.error("Error adding creditor:", error);
    res.status(400).render("credit", { 
      error: "Failed to add creditor",
      formData: req.body // Pass back form data to preserve user input
    });
  }
});

// Display list of creditors
router.get("/creditorsList", isAuthenticated, async (req, res) => {
  try {
    // Check if user has branch information (for branch filtering)
    if (req.user && req.user.branch) {
      const branch = req.user.branch;
      // Only show data from the user's branch
      const buyers = await Credit.find({ branch }).sort({ $natural: -1 });
      res.render("creditorsList", { 
        creditors: buyers,
        branch: branch 
      });
    } else {
      // If no branch filtering needed, show all creditors
      const buyers = await Credit.find().sort({ $natural: -1 });
      res.render("creditorsList", { 
        creditors: buyers 
      });
    }
  } catch (error) {
    console.error("Error fetching creditors list:", error);
    res.status(400).render("error", { 
      message: "Unable to find creditors in the database" 
    });
  }
});

// Display update creditor form
router.get("/updateCreditor/:id", isAuthenticated, async (req, res) => {
  try {
    const updateCredit = await Credit.findOne({ _id: req.params.id });
    if (!updateCredit) {
      return res.status(404).render("error", { 
        message: "Creditor not found" 
      });
    }
    res.render("updatecredit", { creditor: updateCredit });
  } catch (error) {
    console.error("Error finding creditor to update:", error);
    res.status(400).render("error", { 
      message: "Unable to find creditor in the database" 
    });
  }
});

// Submit update creditor form
router.post("/updateCreditor", isAuthenticated, async (req, res) => {
  try {
    console.log("Update creditor request received for ID:", req.query.id);
    console.log("Update data:", req.body);
    
    const updateCredit = await Credit.findOneAndUpdate(
      { _id: req.query.id },
      req.body,
      { new: true }
    );
    
    if (!updateCredit) {
      return res.status(404).render("error", { 
        message: "Creditor not found for update" 
      });
    }
    
    // Add logging to check if update is successful
    console.log("Updated creditor:", updateCredit);
    
    // Use absolute path for redirect
    res.redirect("/credit/creditorsList");
  } catch (error) {
    console.error("Update error:", error);
    res.status(400).render("error", { 
      message: "Unable to update creditor in the database" 
    });
  }
});

// Delete creditor
router.post("/deleteCreditor", isAuthenticated, async (req, res) => {
  try {
    const result = await Credit.deleteOne({ _id: req.body.id });
    
    if (result.deletedCount === 0) {
      console.log("No creditor found to delete");
    } else {
      console.log("Creditor deleted successfully");
    }
    
    res.redirect("back");
  } catch (error) {
    console.error("Delete error:", error);
    res.status(400).render("error", { 
      message: "Unable to delete creditor in the database" 
    });
  }
});

module.exports = router;