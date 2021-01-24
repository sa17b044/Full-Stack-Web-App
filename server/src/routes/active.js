const Router = require("express");
const cp = require("child_process");
const router = Router();

router.get("/", async (req, res) => {

    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', "no-cache");
    let output = '';
    // const snort = '/opt/snort-sabic/bin/snort'
    //     const snort_lua = '-c /opt/snort-sabic/etc/snort.lua'
    //     const iFace = '-i ens33'
    const cmdActive = `sudo /opt/snort-sabic/bin/snort -c /opt/snort-sabic/etc/snort.lua -i ens33 -A alert_full -d -X -e -s 65535 -k none`
    //     let cmd = `sudo ${snort} ${snort_lua} ${iFace} -A alert_full -d -X -e -s 65535 -k none`
    const {
        stdout,
        stderr
    } = await cp.exec(cmdActive)
    let allOutput = "";
    let count = 0;
    console.log(cmdActive)
    

    stdout.on("data", (chunk) => {
        // console.log(chunk)
        output = chunk.toString();
        console.log(output)
        allOutput += output;
        count++;
        console.log("SEND DATA TO CLIENT")
        // const reg = /\+\+\s+\[\d+\][^;]*\-\-\s+\[\d+\]/gm;
        // allOutput = allOutput.match(reg)
        // console.log(allOutput)
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