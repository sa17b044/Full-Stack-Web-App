const { Router } = require("express");
const cp = require("child_process");
const Log_Model = require("/home/pay/Documents/temp/Full-Stack-Web-App/server/src/models/log_schema.js");
const {
  countDocuments,
} = require("/home/pay/Documents/temp/Full-Stack-Web-App/server/src/models/log_schema.js");
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
  let cmd = req.body.cmd;
  cp.exec(cmd, async (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    
    req.body.log = stdout;

    console.log("1 - #", req.body.log);
    const newlogList = new Log_Model(req.body);
    console.log("2 - ##", newlogList);
    try {
      const logList = await newlogList.save();
      if (!logList) throw new Error("wrong saving");
      res.status(200).json(logList);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const removed = await Log_Model.findByIdAndDelete(id);
    // console.log(removed)
    if (!removed) throw Error("Something went wrong ");
    res.status(200).json(removed);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
module.exports = router;
