const {
    Router
} = require("express");
const fs = require("fs");
const cp = require("child_process");
const Policy_Model = require("/home/payman/#Project/Full-Stack-Web-App/server/src/models/policy_schema.js");
const Server_Model = require("/home/payman/#Project/Full-Stack-Web-App/server/src/models/server_schema.js");
const {
    ConnectionStates
} = require("mongoose");
const {
    CommandCursor
} = require("mongodb");
const {
    countDocuments
} = require("/home/payman/#Project/Full-Stack-Web-App/server/src/models/policy_schema.js");


const router = Router();

router.get("/sse", async (req, res) => {
    //################################### - - - - > sse connection 
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', "no-cache");

    let output = '';
    // let cmd = 'ls'
    let cmd = 'snort -c /opt/snort-sabic/etc/snort.lua -R /home/payman/snort_src/snort3/etc/rules/local.rules -r /home/payman/snort_src/snort3/captures/test_case/knxnetip/header/02_knxnetip_invalid_header_size.pcap -A alert_full -d -X -e'
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
        const reg = /\+\+\s+\[\d+\][^;]*\-\-\s+\[\d+\]/gm;
        allOutput = allOutput.match(reg)
        // console.log(allOutput)
        res.write("data:" + JSON.stringify({
            allOutput,
            count
        }) + "\n\n")
    })
    // stdout.on('end', () => {
    //     //console.log('Finished data chunks.');
    // });
});
//################################# - - - > Log
router.post("/", async (req, res) => {

    let i = 0;
    // --------------------------------> policy
    const arrayPolicy = await Policy_Model.find();
    //console.log(arrayPolicy)
    const arrayElPolicy = [];
    arrayPolicy.forEach(elPolicy => {
        ++i
        //####################################### -> individual_addressing
        let templateIndividual_addressing = 'individual_addressing = ' + elPolicy.individual_addressing + ',';
        //####################################### -> inspection
        if (elPolicy.inspection === 'true') {
            elPolicy.inspection = 'inspection = true,'
        } else
            elPolicy.inspection = ''
        let inspection = elPolicy.inspection;
        //############################### -> templateServices
        let services = [];
        elPolicy.services.forEach(elServices => {
            if (elServices.select !== '') {
                services.push(`'${elServices.select}'`)
            } else
                services = undefined;
        });
        let templateServices = ``;
        if (!services) {
            templateServices = "";
        } else {
            templateServices = `services = {${services}},`;
        }
        //############################### -> templateApp_services
        let app_services = [];
        elPolicy.app_services.forEach(elApp_services => {
            if (elApp_services.select_app !== '') {
                app_services.push(`'${elApp_services.select_app}'`)
            } else
                app_services = undefined;
        });
        let templateApp_services = ``;
        if (!app_services) {
            templateApp_services = "";
        } else {
            templateApp_services = `app_services = {${app_services}},`;
        }
        //####################################### -> detection
        if (elPolicy.detection === 'true') {
            elPolicy.detection = 'detection = true,'
        } else
            elPolicy.detection = ''
        let detection = elPolicy.detection;
        //####################################### -> group_address_level
        if (elPolicy.group_address_level !== '') {
            elPolicy.group_address_level = `group_address_level = ${elPolicy.group_address_level},`
        } else
            elPolicy.group_address_level = ''
        let group_address_level = elPolicy.group_address_level;
        //###################################### -> group_address_file 
        elPolicy.group_address_file = `group_address_file = '${elPolicy.group_address_file}',`
        let group_address_file = elPolicy.group_address_file
        //###################################### -> payload
        if (elPolicy.payload === 'true') {
            elPolicy.payload = 'payload = true,'
        } else
            elPolicy.payload = ''
        let payload = elPolicy.payload
        //######################################## -> header
        if (elPolicy.header === 'true') {
            elPolicy.header = 'header = true,'
        } else
            elPolicy.header = ''
        let header = elPolicy.header;
        arrayElPolicy.push({
            templateIndividual_addressing,
            inspection,
            templateServices,
            templateApp_services,
            detection,
            group_address_level,
            group_address_file,
            payload,
            header
        })

    });
    // ####################################### -> Server
    const arrayServer = await Server_Model.find();
    const arrayElServer = [];
    arrayServer.forEach(elServer => {
        //################################### -> From
        if (elServer.src_ip !== '') {
            elServer.src_ip = `from = '${elServer.src_ip}',`
        } else
            elServer.src_ip = ''
        let from = elServer.src_ip;
        //################################### -> to
        if (elServer.dst_ip !== '') {
            elServer.dst_ip = `to = '${elServer.dst_ip}',`
        } else
            elServer.dst_ip = ''
        let to = elServer.dst_ip;
        //################################### -> port
        let ports = [];
        elServer.src_port.forEach(elPort => {
            if (elPort.sPort !== '') {
                ports.push(`${elPort.sPort}`)
            } else
                ports = undefined;
        });
        let templatePorts = ``;
        if (!ports) {
            templatePorts = "";
        } else {
            templatePorts = `services = {${ports}},`;
        }
        //################################### -> policy
        let policy = 'policy = ' + elServer.policy + ',';
        //################################### -> logKNXnetip
        if (elServer.logKNXnetip === 'true') {
            elServer.logKNXnetip = 'log_knxnetip = true,';
        } else
            elServer.logKNXnetip = '';
        let log_knxnetip = elServer.logKNXnetip;
        //################################## ->
        let log_to_file = 'log_to_file = ' + elServer.logToFile + ',';
        arrayElServer.push({
            from,
            to,
            templatePorts,
            policy,
            log_knxnetip,
            log_to_file
        })
        //     let regex = /:/gm
        //     tempPolicies = tempPoliciesE.replace(regex,"=");
        // //console.log(lua)
        // fs.writeFile("/home/payman/#Project/Full-Stack-Web-App/server/src/public/snort.lua", lua, (err) => {
        //     if (err) {
        //         //console.log(err);
        //         return;
        //     }
        //     //console.log("successfully");
        // });
    });
    console.log(arrayElPolicy)
    console.log(arrayElServer)
});

module.exports = router;