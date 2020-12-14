// console.log('test');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const userListRoutes = require("./routes/api/userList.js");
const serverListRoutes = require("./routes/api/serverList.js");
const logListRoutes = require("./routes/api/logList.js");
const policyListRoutes = require("./routes/api/policyList");
const pingListRoutes = require("./routes/api/pingList");
const testListRoutes = require("./routes/api/testList");

const PORT = 8081;
const app = express();
// Database connection
const dbUrl = "mongodb://127.0.0.1:27017/bsa";
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) => {
    app.listen(PORT);
    console.log("http://localhost:8081/");
    console.log("Server is running ...");
  })
  .catch((err) => {
    console.log("Error Database connection..." + "\n" + err);
  });

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());
app.use('/api/userList',userListRoutes);
app.use('/api/serverList',serverListRoutes);
app.use('/api/logList',logListRoutes);
app.use('/api/policyList',policyListRoutes);
app.use('/api/pingList',pingListRoutes);
app.use('/api/testList',testListRoutes);
app.use(express.static("public"));
// /home/pay/Documents/temp/Full-Stack-Web-App/server/src/routes/api/policyList.js

app.get("/", (req, res) => {
  res.send('<a href="http://localhost:8080">http://localhost:8080</a>');
});
