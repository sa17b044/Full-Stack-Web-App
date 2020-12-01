// console.log('test');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const morgan = require('morgan')
const mongoose = require("mongoose");

const Policy_Model = require("./models/policy_schema");
const Server_Model = require("./models/server_schema");
const Users_Model = require("./models/server_schema");
const { json } = require("body-parser");

const app = express();
// Database connection
const dbUrl = "mongodb://127.0.0.1:27017/test02";
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) => {
    app.listen(8081);
    console.log("http://localhost:8081/");
    console.log("Server is running ...");
  })
  .catch((err) => {
    console.log("Error Database connection..." + "\n" + err);
  });

// app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {});

app.post("/dbStoreUser", (req, res) => {
  user2db(req.body,res);
});
app.post("/login", (req, res) => {
  res.send({
    msg: `Hello ${req.body.user},${req.body.pass}`,
  });
});

//function
const user2db = (data,res) => {
  data.forEach(el => {
      console.log('#####')
      console.log(el)
  });
};
