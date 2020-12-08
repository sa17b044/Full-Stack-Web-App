const { timeStamp } = require("console");
const mongoose = require("mongoose");

const logs_schema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },
    cmd: {
      type: String,
      required: true,
    },
    log: {
      type: String,
      required: true,
    },
  }
);

const Logs_Model = mongoose.model("Logs_Model", logs_schema);
module.exports = Logs_Model;
