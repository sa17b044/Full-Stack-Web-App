const bcrypt = require("bcryptjs");
const { Router } = require("express");
// const userAuth = require("../../../utils/Auth.js");
const router = Router();
const Users_Model = require("../models/userSchema.js");


router.get("/",async (req, res) => {
  try {
    const userList = await Users_Model.find();
    console.log(userList)
    if (!userList) throw new Error("No user List");
    const stored = userList.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    res.status(200).json(stored);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
// send to Database
router.post("/",async (req, res) => {
  //hash password
  const password = req.body.password
  // const hash = bcrypt.hashSync(password,10)
  // // console.log(hash)
  // req.body.password = hash;
  // store data
  const newUserList = new Users_Model(req.body);
  try {
    const userList = await newUserList.save();
    if (!userList) throw new Error("wrong saving");
    res.status(200).json(userList);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}); 
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Users_Model.findByIdAndUpdate(id, req.body);
    // console.log(response)
    if (!response) throw new Error("wrong updating");
    const updated = { ...response._doc, ...req.body };
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const removed  = await Users_Model.findByIdAndDelete(id);
    // console.log(removed)
    if (!removed) throw Error('Something went wrong ')
    res.status(200).json(removed)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
