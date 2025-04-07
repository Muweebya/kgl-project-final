const express = require("express");

const router = express.Router();

router.get("/directorDash", (req,res) => {
    res.render("directorDashboard")
});

module.exports = router;