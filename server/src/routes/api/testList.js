const { Router } = require("express");
const fs = require("fs");
const cp = require("child_process");
const Log_Model = require("/home/pay/Documents/temp/Full-Stack-Web-App/server/src/models/log_schema.js");
const Policy_Model = require("/home/pay/Documents/temp/Full-Stack-Web-App/server/src/models/policy_schema.js");
const Server_Model = require("/home/pay/Documents/temp/Full-Stack-Web-App/server/src/models/server_schema.js");

const {
  countDocuments,
} = require("/home/pay/Documents/temp/Full-Stack-Web-App/server/src/models/log_schema.js");
const { constants } = require("buffer");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const logList = await Log_Model.find();
    if (!logList) throw new Error("No item List");
    const stored = logList.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    res.status(200).json(stored);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  server_name = req.body.server_name;
  policy_name = req.body.policy_name;

  try {
    const pList = await Policy_Model.findOne({ policy_name: policy_name });
    const sList = await Server_Model.findOne({ server_name: server_name });
    // console.log("###");
    // console.log("template");
    const template = `${pList} \n ${sList}`;

    fs.writeFile("../server/src/public/snort.lua", template, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("successfully");
    });

    runCommand =
      "ls /home/pay/Documents/temp/Full-Stack-Web-App/server/src/public";
    cp.exec(runCommand, async (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      // console.log(stdout);
      req.body.cmd = stdout;
      // console.log(req.body);
      const newLog = new Log_Model(req.body);
      // console.log(newLog);
      const logList = await newLog.save();
      if (!logList) throw new Error("wrong saving");
      res.status(200).json(logList);
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
