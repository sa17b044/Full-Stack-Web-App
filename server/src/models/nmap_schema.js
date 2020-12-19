const { timeStamp } = require("console");
const mongoose = require("mongoose");

const nmap_schema = new mongoose.Schema(
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

const Nmap_Model = mongoose.model("Nmap_Model", nmap_schema);
module.exports = Nmap_Model;
