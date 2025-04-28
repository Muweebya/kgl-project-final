const express = require("express");
const router = express.Router();
const validBranches = ["matugga", "maganjo"];

// Define authentication middleware
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login'); // Redirect to login page if not authenticated
};

// Define getSalesAgentData function
const getSalesAgentData = async (branch) => {
  try {
    // This function should retrieve sales agent data for the specified branch
    // You can modify this to match your actual data retrieval needs
    // Example implementation:
    const Sale = require("../models/Sale");
    const Credit = require("../models/Credit");
    
    const sales = await Sale.find({ branch }).sort({ $natural: -1 });
    const credits = await Credit.find({ branch }).sort({ $natural: -1 });
    
    return { sales, credits };
  } catch (error) {
    console.error("Error fetching sales agent data:", error);
    throw error;
  }
};

router.get("/salesagentDash/:branch", isAuthenticated, async (req, res) => {
    const branch = req.params.branch.toLowerCase();

    if (!validBranches.includes(branch)) {
        return res.status(400).render("error", { message: "Invalid branch" });
    }

    // Check if user has permission for this branch
    if (req.user.role !== "salesagent" && req.user.role !== "director") {
        return res.status(403).render("error", { message: "You don't have permission to access this dashboard" });
    }
    
    if (req.user.role === "salesagent" && req.user.branch.toLowerCase() !== branch) {
        return res.status(403).render("error", { message: "You don't have permission to access this branch" });
    }

    try {
        // Now fetch data just for that branch
        const data = await getSalesAgentData(branch);
        res.render("salesagentDashboard", { data, branch });
    } catch (err) {
        console.error("Sales agent dashboard error:", err);
        res.status(500).render("error", { message: "Server error while loading dashboard" });
    }
});

module.exports = router;