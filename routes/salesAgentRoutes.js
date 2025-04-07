const express = require("express");

const router = express.Router();

router.get("/salesagentDash", (req,res) => {
    res.render("salesagentDashboard")
});

module.exports = router;