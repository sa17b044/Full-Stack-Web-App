const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const {success, error} = require('consola')
const flash = require('connect-flash');
const session = require('express-session')
const passport = require('passport')

const PORT = 8081;
const app = express();
//passpoert config
// require('./config/passport')(passport);
// Routes
const userListRoutes = require("./api/userList.js");
const serverListRoutes = require("./api/serverList");
const policyListRoutes = require("./api/policyList");
const configListRoutes = require("./api/configList");
const xmlListRoutes = require("./api/xmlList");
const filterRoutes = require("./routes/filter");
const activeRoutes = require("./routes/active");
const authRoutes = require("./routes/auth");
// const logInRoutes = require("./api/logIn");

// Middelware
//# bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));
app.use(morgan("tiny"));
//# session
// app.use(session({
//   secret: 'secret',
//   resave: true,
//   saveUninitialized: true,
//   // cookie: { secure: true }
// }))
// // passport mid
// app.use(passport.initialize());
// app.use(passport.session());
// //# flash
// app.use(flash())
//# routes
app.use('/api/userList', userListRoutes);
app.use('/api/serverList', serverListRoutes);
app.use('/api/policyList', policyListRoutes);
app.use('/api/configList', configListRoutes);
app.use('/api/xmlList', xmlListRoutes);
app.use('/filter',filterRoutes)
app.use('/active',activeRoutes)
app.use('/auth',authRoutes)
// app.use('/logIn',logInRoutes)
// Connect to Mongo
// Run Server on PORT
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
  res.send(`<a href="http://localhost:${PORT}">http://localhost:${PORT}</a>`);
});