const { timeStamp } = require("console");
const mongoose = require("mongoose");

const users_schema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    permision: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Users_Model = mongoose.model("Users_Model", users_schema);
module.exports = Users_Model;
