// console.log('test');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const userListRoutes = require("./routes/api/userList.js");

const Policy_Model = require("./models/policy_schema");
const Server_Model = require("./models/server_schema");
// const Users_Model = require("./models/users_schema");
// const { json } = require("body-parser");
const PORT = 8081;
const app = express();
// Database connection
const dbUrl = "mongodb://127.0.0.1:27017/test02";
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

app.get("/", (req, res) => {
  res.send("Hello Payman");
});


// app.post("/login", (req, res) => {});

// app.post("/api/user", (req, res) => {
//   user2db(req.body, res);
// });

// app.get("/api/user", (req, res) => {
//   Users_Model.find()
//     // .sort({ id: 1 })
//     // .limit(1)
//     .then((data) => {
//       console.log(data);
//       res.send(data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   // res.redirect("/login");
// });

// app.post("/login", (req, res) => {
//   console.log(res);
// });

// //function
// const user2db = (data) => {
//   mongoose.connection.db.dropCollection("users_models", (err, result) => {
//     console.log(result);
//   });
//   data.forEach((el) => {
//     const model = new Users_Model({
//       userName: el.user,
//       password: el.pass,
//       permision: el.selected,
//     });
//     model.save();
//   });
//   console.log("User is saved");
// };
