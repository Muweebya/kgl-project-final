const express = require("express");
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/register/login'); // Redirect to login page if not authenticated
  };

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