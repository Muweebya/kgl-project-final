
//Dependencies
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session')({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
});
//import user model
const registration = require("../models/Registration");
const sale = require("../models/Sale");
console.log("Registration module:", registration);
console.log("Directory name:", __dirname);
console.log("Current working directory:", process.cwd());
require('dotenv').config();
//instantiations
const app = express();
const PORT = 3001;
//import routes
const procurementRoutes = require("./routes/procurementRoutes");
const authRoutes = require("./routes/authRoutes");
const salesRoutes = require("./routes/salesRoutes");
const managerRoutes = require("./routes/managerRoutes");
const salesAgentRoutes = require("./routes/salesAgentRoutes");
const directorRoutes = require("./routes/directorRoutes");
const indexRoutes = require("./routes/indexRoutes");
const creditRoutes = require("./routes/creditRoutes");


//configurations

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
  mongoose.connection
    .on('open', () => {
      console.log('Mongoose connection open');
    })
    .on('error', (err) => {
      console.log(`Connection error: ${err.message}`);
    });
app.set("view engine", "pug")

app.set("views", path.join(__dirname, "views"))
//middleware
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({ extended: true })); //helps to parse data from forms
//express session configs
app.use(session);
app.use(passport.initialize());
app.use(passport.session());
//passport configs
passport.use(registration.createStrategy());
passport.serializeUser(registration.serializeUser());
passport.deserializeUser(registration.deserializeUser());
//routes/using imported routes
app.use("/procurement", procurementRoutes)
app.use("/", authRoutes)
app.use("/sales", salesRoutes)
app.use("/", managerRoutes)
app.use("/", salesAgentRoutes)
app.use("/", directorRoutes)
app.use("/", indexRoutes)
app.use("/credit", creditRoutes)


//bootstraping the server
app.listen(PORT, () => console.log(`listening on port ${PORT}`))
