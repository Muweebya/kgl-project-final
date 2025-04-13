const express = require("express");
const router = express.Router();
const passport = require("passport");
// Import the Registration model with consistent capitalization
const Registration = require("../models/Registration");

router.get("/register", (req, res) => {
    res.render("registration");
});

router.post("/register", async (req, res) => {
    try {
        const user = new Registration(req.body);
        let existingUser = await Registration.findOne({
            emailaddress: req.body.emailaddress
        });
        
        if (existingUser) {
            return res.status(400).send("Not registered, email already exists");
        } else {
            
            Registration.register(user, req.body.password)
                .then(() => {
                    res.redirect("/login");
                })
                .catch(error => {
                    console.log(error);
                    res.status(400).render("registration");
                });
        }
    } catch (error) {
        console.log(error);
        res.status(400).render("registration");
    }
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", passport.authenticate("local", { failureRedirect: "/login" }), (req, res) => {
    console.log(req.body);
    req.session.user = req.user;
    
    if (req.user.role === "manager") {
        res.redirect("/managerDash");
    } else if (req.user.role === "salesagent") {
        res.redirect("/salesagentDash");
    } else if (req.user.role === "director") {
        res.redirect("/directorDash");
    } else {
        res.send("You don't have any role in the system");
    }
});

router.get("/logout", (req, res) => {
    if (req.session) {
        // Fixed the typo: destory -> destroy
        req.session.destroy((error) => {
            if (error) {
                return res.status(500).send("Error logging out");
            }
            res.redirect("/");
        });
    } else {
        res.redirect("/");
    }
});

router.get("/usersList", async (req, res) => {
    try {
        
        const users = await Registration.find().sort({$natural: -1});
        res.render("usersList", {
            users: users
        });
    } catch (error) {
        console.log(error);
        res.status(400).send("Unable to find users in the database");
    }
});
router.get("/updateUser/:id", async(req,res) => {
try{
    const updateUser = await Registration.findOne({_id:req.params.id});
    res.render("updateusers", {user:updateUser});
}catch(error){
    res.status(400).send("Unable to find user in the database")
}
})
router.post("/updateUser", async(req,res) => {
    try{
      // Use your existing variable name
      const updateUser = await Registration.findOneAndUpdate(
        {_id: req.query.id},
        req.body,
        {new: true}
      );
      
      // Add logging to check if update is successful
      console.log("Updated user:", updateUser);
      
      // Use absolute path for redirect
      res.redirect("/register/usersList");
    }catch(error){
      console.log("Update error:", error);
      res.status(400).send("Unable to update user in the database")
    }
  })
  router.post("/deleteUser", async(req, res) => {
    try {
      await Registration.deleteOne({_id: req.body.id});
      res.redirect("back");
    } catch(error) {
      console.log("Delete error:", error);
      res.status(400).send("Unable to delete user from the database");
    }
  });
module.exports = router;