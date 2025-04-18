const express = require("express");

const router = express.Router();
const validBranches = ["matugga", "maganjo"];


router.get("/managerDash/:branch", isAuthenticated, (req, res) => {
    const branch = req.params.branch.toLowerCase();

    if (!validBranches.includes(branch)) {
        return res.status(400).send("Invalid branch");
    }

    // Now fetch data just for that branch
    getManagerData(branch)
        .then(data => {
            res.render("managerDashboard", { data, branch });
        })
        .catch(err => {
            res.status(500).send("Server error");
        });
});

module.exports = router;