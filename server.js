//Dependencies
const express = require('express');
const path = require('path');
const mongoose = require('mongoose')

require('dotenv').config();
//instantiations
const app = express();
const PORT = 3001;
//import routes
const procurementRoutes = require("./routes/procurementRoutes")
const registrationRoutes = require("./routes/registrationRoutes")
const salesRoutes = require("./routes/salesRoutes")

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
//routes/using imported routes
app.use("/procurement", procurementRoutes)
app.use("/register", registrationRoutes)
app.use("/sales", salesRoutes)
//bootstraping the server
app.listen(PORT, () => console.log(`listening on port ${PORT}`))
