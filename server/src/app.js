const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const {success, error} = require('consola')
// const passport = require('passport');
const PORT = 8081;
const app = express();

// middelware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));
app.use(morgan("tiny"));
// app.use(passport.initialize());

// routes
const userListRoutes = require("./api/userList.js");
const serverListRoutes = require("./api/serverList");
const policyListRoutes = require("./api/policyList");
const configListRoutes = require("./api/configList");
const xmlListRoutes = require("./api/xmlList");
const filterRoutes = require("./routes/filter");
const activeRoutes = require("./routes/active");
const loginRoutes = require("./routes/login");

app.use('/api/userList', userListRoutes);
app.use('/api/serverList', serverListRoutes);
app.use('/api/policyList', policyListRoutes);
app.use('/api/configList', configListRoutes);
app.use('/api/xmlList', xmlListRoutes);
app.use('/filter',filterRoutes)
app.use('/active',activeRoutes)
app.use('/login',loginRoutes)
// Database connection and star web app
const dbUrl = "mongodb://127.0.0.1:27017/bsa";
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) => {
    app.listen(PORT);
    success({message:`http://localhost:${PORT}/`, badge:true})
  })
  .catch((err) => {
    error({message:`Unable connect to the database`, badge:true})
  });


app.get("/", (req, res) => {
  res.send(`b<a href="http://localhost:${PORT}">http://localhost:${PORT}</a>`);
});