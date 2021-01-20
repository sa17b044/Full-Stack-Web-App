const {
    Router
} = require("express");
const cp = require("child_process");
const router = Router();

router.get("/", async (req, res) => {

});
router.post("/", async (req, res) => {
    console.log('### POST ###')
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', "no-cache");
    const ip = req.body.ip
    let output = '';
    let cmd = `ping -c 4 ${ip}`
    const {
        stdout,
        stderr
    } = await cp.exec(cmd)
    let allOutput = "";
    let count = 0;
    stdout.on("data", (chunk) => {
        output = chunk.toString();
        allOutput += output;
        count++;
        console.log("SEND DATA TO CLIENT")
        console.log(allOutput)
        res.write("data:" + JSON.stringify({
            allOutput,
            count
        }) + "\n\n")
    })
    stdout.on('end', () => {
        console.log('Finished data chunks.');
    });

});

module.exports = router;