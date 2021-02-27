const Router = require("express");
const router = Router();
const Users = require("../models/userSchema.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// console.log(Users)

router.post("/login", (req, res, next) => {
  console.log("#");
  console.log(req.body);
  Users.findOne({ username: req.body.username }, (err, user) => {
      console.log(user)
    if (!user) {
      console.log("User wrong");
      return (
        res,
        status(401).json({
          error: "Username wrong",
        })
      );
    }
    if (user.password !== req.body.password) {
      console.log("Password wrong");
      return res.status(401).json({
        error: "Password wrong",
      });
    }
    // console.log(user)
    // if (bcrypt.compareSync(req.body.password, user.password)) {
    //     console.log('Password wrong')
    //   return res.status(401).json({
    //     error: "Password wrong",
    //   });
    // }
    // if correct - webtoken
    console.log(user.role)
    let token = jwt.sign({ userId: user._id }, "secretkey");
    return res.status(200).json({
      msg: "succes",
      token: token,
      role: user.role
    });
  });
});

module.exports = router;
