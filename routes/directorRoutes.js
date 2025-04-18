const express = require("express");

const router = express.Router();


router.get("/directorDash", isAuthenticated, (req, res) => {
    getAllData()
        .then(data => {
            res.render("directorDashboard", { data });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Error loading director dashboard");
        });
});

module.exports = router;