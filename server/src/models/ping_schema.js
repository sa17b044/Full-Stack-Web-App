const { timeStamp } = require("console");
const mongoose = require("mongoose");

const ping_schema = new mongoose.Schema(
  {
    data: {
      type: Date,
      default: Date.now,
    },
    ip: {
      type: String,
      required: true,
    },
    output: {
      type: String,
      required: true,
    },    
    cmd: {
      type: String,
      required: true,
    },
  }
  // { timestamps: true }
);

const Ping_Model = mongoose.model("Ping_Model", ping_schema);
module.exports = Ping_Model;
