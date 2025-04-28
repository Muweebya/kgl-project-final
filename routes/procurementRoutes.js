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
  res.render("procurement", { 
    currentUser: req.user,
    branch: req.user.branch
  });
});

// Submit new product form route
router.post("/addProduct", isAuthenticated, async (req, res) => { 
  try {
    const newProduce = new Produce({
      ...req.body,
      branch: req.user.branch // Use the authenticated user's branch
    });
    await newProduce.save();
    console.log("New produce added:", newProduce);
    res.redirect("/procurement/procuredProduceList");
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(400).render("procurement", { 
      error: "Failed to add product",
      formData: req.body,
      currentUser: req.user,
      branch: req.user.branch
    });
  }
});

// Display list of procured produce
router.get("/procuredProduceList", isAuthenticated, async (req, res) => {
  try {
    // Check if user has branch information (for branch filtering)
    if (req.user && req.user.role != 'director' && req.user.branch) {
      const branch = req.user.branch;
      // Only show data from the user's branch
      const products = await Produce.find({ branch }).sort({ $natural: -1 });
      res.render("procuredProduceList", { 
        procuredProduce: products,
        branch: branch,
        userRole: req.user.role
      });
    } else {
      // If no branch filtering needed, show all products
      const products = await Produce.find().sort({ $natural: -1 });
      res.render("procuredProduceList", { 
        procuredProduce: products,
        userRole: req.user.role,
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
    const id = req.query.id;
    if (!id) {
      return res.status(400).render("error", { 
        message: "Product ID is required for update" 
      });
    }

    const updateProduct = await Produce.findByIdAndUpdate(
      id,
      {
        ...req.body,
        branch: req.user.branch // Ensure branch is set to user's branch
      },
      { new: true }
    );
    
    if (!updateProduct) {
      return res.status(404).render("error", { 
        message: "Product not found for update" 
      });
    }
    
    console.log("Updated product:", updateProduct);
    res.redirect("/procurement/procuredProduceList");
  } catch (error) {
    console.error("Update error:", error);
    res.status(400).render("updateproduce", { 
      error: "Failed to update product. Please try again.",
      produce: req.body
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

