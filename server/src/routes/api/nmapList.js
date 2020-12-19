const {
    Router
} = require("express");
const cp = require("child_process");
const Nmap_Model = require("/home/payman/#Project/Full-Stack-Web-App/server/src/models/nmap_schema.js");
const router = Router();

router.get("/", async (req, res) => {
    try {
        const nmapList = await Nmap_Model.find();
        if (!nmapList) throw new Error("No item List");
        const stored = nmapList.sort((a, b) => {
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
        // console.log(stdout)
        req.body.output = stdout;
        console.log(req.body);
        const newNmapList = new Nmap_Model(req.body);
        console.log(newNmapList);
        try {
            const nmapList = await newNmapList.save();
            if (!nmapList) throw new Error("wrong saving");
            res.status(200).json(nmapList);
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    });
});
router.delete("/:id", async (req, res) => {
    const {
        id
    } = req.params;
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