const express = require("express");

const router = express.Router();
const passport = require("passport");
//import models
const registration = require("../models/Registration");

router.get("/register", (req, res) => {
    res.render("registration")
})

router.post("/register", async (req, res) => {
    try {
        const user = new registration(req.body);
        let existingUser = await registration.findOne({
            emailaddress: req.body.emailaddress
        });
        if (existingUser) {
            return res.status(400).send("Not registered, email already existes")
        } else {
            await registration.register(user, req.body.password, (error) => {
                if (error) {
                    throw error;
                }
                res.redirect("/login")
            })
        }


        console.log(user)

    } catch (error) {
        res.status(400).render("registration");
        console.log(error);



    }


});

router.get("/login", (req, res) => {
    res.render("login")

})

router.post("/login", passport.authenticate("local", { failureRedirect: "/login" }), (req, res) => {
    console.log(req.body);
    req.session.user = req.user;
    if(req.user.role === "manager"){
        res.redirect("/managerDash")
    }else if(req.user.role === "salesagent"){
        res.redirect("/salesagentDash")
    }else if(req.user.role === "director"){
        res.redirect("/directorDash")
    }else{
        res.send("You don't have any role in the system")
    }
    
    
    
})


router.get("/logout", (req,res) => {
    if(req.session){
        req.session.destory((error) => {
            if(error){
                return res.status(500).send("Error logging out")
            }
            res.redirect("/")
        })
    }
})

router.get("/usersList", async(req,res) => {
    try{
        const users = await Registration.find().sort({$natural:-1});
        res.render("usersList", {
            users:users
        })
    }catch(error){
        res.status(400).send("Unable to find users in the database")
    }
    
})


module.exports = router;