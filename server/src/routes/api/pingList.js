const { Router } = require("express");
const cp = require("child_process");
const Ping_Model = require("/home/payman/#Project/Full-Stack-Web-App/server/src/models/ping_schema.js");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const pingList = await Ping_Model.find();
    if (!pingList) throw new Error("No item List");
    const stored = pingList.sort((a, b) => {
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
    
    req.body.output = stdout;
    console.log(req.body)
    const newpingList = new Ping_Model(req.body);
    console.log(newpingList)
    try {
      const pingList = await newpingList.save();
      if (!pingList) throw new Error("wrong saving");
      res.status(200).json(pingList);
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
    const removed = await Ping_Model.findByIdAndDelete(id);
    // console.pings(removed)
    if (!removed) throw Error("Something went wrong ");
    res.status(200).json(removed);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
module.exports = router;
