const express = require("express");
const router = express.Router();

// Import models
const Produce = require("../models/Procurement");

// Define authentication middleware
// This middleware checks if a user is logged in before allowing access
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login'); // Redirect to login page if not authenticated
};

// Add new product form route
router.get("/addProduct", isAuthenticated, (req, res) => {
  res.render("procurement");
});

// Submit new product form route
router.post("/addProduct", isAuthenticated, async (req, res) => { 
  try {
    const newProduce = new Produce(req.body);
    await newProduce.save();
    console.log("New produce added:", newProduce);
    res.redirect("/procurement/procuredProduceList");
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(400).render("procurement", { 
      error: "Failed to add product",
      formData: req.body // Pass back form data to preserve user input
    });
  }
});

// Display list of procured produce
router.get("/procuredProduceList", isAuthenticated, async (req, res) => {
  try {
    // Check if user has branch information (for branch filtering)
    if (req.user && req.user.branch) {
      const branch = req.user.branch;
      // Only show data from the user's branch
      const products = await Produce.find({ branch }).sort({ $natural: -1 });
      res.render("procuredProduceList", { 
        procuredProduce: products,
        branch: branch
      });
    } else {
      // If no branch filtering needed, show all products
      const products = await Produce.find().sort({ $natural: -1 });
      res.render("procuredProduceList", { 
        procuredProduce: products 
      });
    }
  } catch (error) {
    console.error("Error fetching produce list:", error);
    res.status(400).render("error", { 
      message: "Unable to find produce in the database" 
    });
  }
});

// Display update product form
router.get("/updateProduct/:id", isAuthenticated, async (req, res) => {
  try {
    const updateProduct = await Produce.findOne({ _id: req.params.id });
    if (!updateProduct) {
      return res.status(404).render("error", { 
        message: "Product not found" 
      });
    }
    res.render("updateproduce", { produce: updateProduct });
  } catch (error) {
    console.error("Error finding product to update:", error);
    res.status(400).render("error", { 
      message: "Unable to find item in the database" 
    });
  }
});

// Submit update product form
router.post("/updateProduct", isAuthenticated, async (req, res) => {
  try {
    // Use your existing variable name
    const updateProduct = await Produce.findOneAndUpdate(
      { _id: req.query.id },
      req.body,
      { new: true }
    );
    
    if (!updateProduct) {
      return res.status(404).render("error", { 
        message: "Product not found for update" 
      });
    }
    
    // Add logging to check if update is successful
    console.log("Updated product:", updateProduct);
    
    // Use absolute path for redirect
    res.redirect("/procurement/procuredProduceList");
  } catch (error) {
    console.error("Update error:", error);
    res.status(400).render("error", { 
      message: "Unable to update item in the database" 
    });
  }
});

// Delete produce
router.post("/deleteProduce", isAuthenticated, async (req, res) => {
  try {
    const result = await Produce.deleteOne({ _id: req.body.id });
    
    if (result.deletedCount === 0) {
      console.log("No document found to delete");
    } else {
      console.log("Product deleted successfully");
    }
    
    res.redirect("back");
  } catch (error) {
    console.error("Delete error:", error);
    res.status(400).render("error", { 
      message: "Unable to delete produce in the database" 
    });
  }
});

module.exports = router;

//localhost:3001/procurement/addProduct

