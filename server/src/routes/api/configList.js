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
        // console.log("SEND DATA TO CLIENT")
        const reg = /\+\+\s+\[\d+\][^;]*\-\-\s+\[\d+\]/gm;
        allOutput = allOutput.match(reg)
        // console.log(allOutput)
        res.write("data:" + JSON.stringify({
            allOutput,
            count
        }) + "\n\n")
    })
    // stdout.on('end', () => {
    //     console.log('Finished data chunks.');
    // });
});
//#################################
// const template = (y,x) => {
//     let temp = ''
// x.forEach(el => {
// console.log(el)
// console.log(y) 
// });
// // console.log(temp)
// }
//################################# - - - > Log
router.post("/", async (req, res) => {

    const server = await Server_Model.find();

    // console.log(server)
    let i = 0;
    // --------------------------------> policy
    const arrayPolicy = await Policy_Model.find();
    console.log(arrayPolicy)
    const arrayElPolicy = [];

    arrayPolicy.forEach(elPolicy => {
        ++i
        console.log(i + '\n ###############################')
        //####################################### -> individual_addressing
        let templateIndividual_addressing = 'individual_addressing = ' + elPolicy.individual_addressing + ',';
        console.log(templateIndividual_addressing)
        //####################################### -> inspection
        // console.log(elPolicy.inspection)
        if (elPolicy.inspection === 'true') {
            elPolicy.inspection = 'inspection = true,'
        } else
            elPolicy.inspection = ''
        console.log(elPolicy.inspection)
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
        console.log(`${templateServices}`)
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
        console.log(`${templateApp_services}`)
        //####################################### -> detection
        // console.log(elPolicy.detection)
        if (elPolicy.detection === 'true') {
            elPolicy.detection = 'detection = true,'
        } else
            elPolicy.detection = ''
        console.log(elPolicy.detection)
        let detection = elPolicy.detection;
        //####################################### -> group_address_level
        if (elPolicy.group_address_level !== '') {
            elPolicy.group_address_level = `group_address_level = ${elPolicy.group_address_level},`
        } else
            elPolicy.group_address_level = ''
        console.log(elPolicy.group_address_level)
        let group_address_level = elPolicy.group_address_level;
        //###################################### -> group_address_file 
        elPolicy.group_address_file = `group_address_file = '${elPolicy.group_address_file}',`
        console.log(elPolicy.group_address_file)
        let group_address_file = elPolicy.group_address_file
        //###################################### -> payload
        if (elPolicy.payload === 'true') {
            elPolicy.payload = 'payload = true,'
        } else
            elPolicy.payload = ''
        console.log(elPolicy.payload)
        let payload = elPolicy.payload
        //######################################## -> header
        if (elPolicy.header === 'true') {
            elPolicy.header = 'header = true,'
        } else
            elPolicy.header = ''
        console.log(elPolicy.header)
        let header = elPolicy.header;
        // console.log('\n')
        
        arrayElPolicy.push(
            {
                templateIndividual_addressing,
                inspection,
                templateServices,
                templateApp_services,
                detection,
                group_address_level,
                group_address_file,
                payload
            }
        )
    });
    console.log(arrayElPolicy)

    //     // policies - - - ######################################################
    //     let policies = [];
    //     let policiesArr = Object.entries(pList._doc)
    //     policiesArr.forEach(([key, value]) => {
    //         if (value === 'true' || key === 'group_address_level') {
    //             policies.push(`\n${key}: ${value}`)
    //         }
    //     });
    //     tempPoliciesE = `${policies}`;
    //     let regex = /:/gm
    //     tempPolicies = tempPoliciesE.replace(regex,"=");

    // ----------------------------------------------------------------------------------------------------------
    //     let itemSport = sList.src_port;
    //     let src_port = [];
    //     itemSport.forEach((element) => {
    //         if (element.sPort !== '') {
    //             src_port.push(`${element.sPort}`)
    //         } else
    //             src_port = undefined;
    //     });
    //     if (!src_port) {
    //         tempSrc_port = ""
    //     } else if (src_port.length >= 2) {
    //         tempSrc_port = `port = {${src_port}},`;
    //     } else {
    //         tempSrc_port = `port = ${src_port},`;;
    //     }
    //     let itemDport = sList.dst_port;
    //     let dst_port = [];
    //     itemDport.forEach((element) => {
    //         if (element.dPort !== '') {
    //             dst_port.push(`${element.dPort}`)
    //         } else
    //             dst_port = undefined;
    //     });
    //     if (!dst_port) {
    //         tempDst_port = ""
    //     } else if (dst_port.length >= 2) {
    //         tempDst_port = `port = {${dst_port}},`;
    //     } else {
    //         tempDst_port = `port = ${dst_port},`;;
    //     }
    //     // console.log(tempDst_port)
    //     if (sList.src_ip === "") {
    //         console.log('No SrcIP')
    //     } else {
    //         sList.src_ip = `from = '${sList.src_ip}',`;
    //         // console.log(sList.src_ip)
    //     }
    //     // dst ip ######################
    //     if (sList.dst_ip === "") {
    //         console.log('No DstIP')
    //         // delete sList.dst_ip;
    //     } else {
    //         sList.dst_ip = `to = '${sList.dst_ip}',`;
    //         // console.log(sList.dst_ip)
    //     }
    //     //#############################
    //     tempPolicy = `policy = ${sList.policy}`
    //     //##################################

    //     let lua = `
    //     ---------------------------------------------------------------------------
    // -- Snort++ configuration
    // ---------------------------------------------------------------------------

    // ---------------------------------------------------------------------------
    // -- 1. configure environment
    // ---------------------------------------------------------------------------

    // -- this depends on LUA_PATH
    // -- used to load this conf into Snort
    // require('snort_config')

    // -- this depends on SNORT_LUA_PATH
    // -- where to find other config files
    // -- conf_dir = os.getenv('SNORT_LUA_PATH')
    // conf_dir = '/opt/snort-sabic/etc/snort'

    // if ( not conf_dir ) then
    //     conf_dir = '.'
    // end

    // ---------------------------------------------------------------------------
    // -- 2. configure defaults
    // ---------------------------------------------------------------------------

    // HOME_NET = '172.22.0.0/16'
    // EXTERNAL_NET = '! ' .. HOME_NET

    // KNX_NET = [[172.22.10.76/32 172.22.10.77/32]]
    // BAC_NET = [[172.22.11.76/32 172.22.11.77/32]]
    // ENO_NET = '172.22.13.76/32'

    // dofile(conf_dir .. '/snort_defaults.lua')
    // -- dofile(conf_dir .. '/file_magic.lua')

    // ---------------------------------------------------------------------------
    // -- 3. configure inspection
    // ---------------------------------------------------------------------------
    // stream = { }
    // stream_ip = { }
    // stream_tcp = { }
    // stream_udp = { }

    // knxnetip = 
    // { 
    //     -- global_policy = 0,
    //     policies =
    //     {
    //         {
    //         ${tempPolicies},
    //         ${tempServices}
    //         ${tempApp_services}
    //         group_address_file = '${pList.group_address_file}'
    //         }
    //     },
    //     servers = 
    //     {
    //         ${sList.src_ip}
    //         ${tempSrc_port}
    //         ${sList.dst_ip}
    //         ${tempPolicy},
    //         log_knxnetip = ${sList.logKNXnetip},
    //         log_to_file = ${sList.logToFile},
    //     },
    // }

    // ---------------------------------------------------------------------------
    // -- 4. configure bindings
    // ---------------------------------------------------------------------------

    // binder =
    // {
    //     -- { when = { proto = 'udp', ports = '3671' }, use = { type = 'knxnetip' } },
    //     { when = { proto = 'any', ports = 'any' }, use = { type = 'knxnetip' } },
    //     -- { when = { service = 'knxnetip' },         use = { type = 'knxnetip' } }
    // }

    // ---------------------------------------------------------------------------
    // -- 5. configure performance
    // ---------------------------------------------------------------------------

    // -- perf_monitor = 
    // -- {
    // --     modules = {},
    // --     flow = true,
    // --     flow_ip = true,
    // --     cpu = true
    // -- }

    // ---------------------------------------------------------------------------
    // -- 6. configure detection
    // ---------------------------------------------------------------------------

    // references = default_references
    // classifications = default_classifications

    // ips =
    // {
    //     -- use this to enable decoder and inspector alerts
    //     enable_builtin_rules = true,
    // ip
    //     -- use include for rules files; be sure to set your path
    //     -- note that rules files can include other rules files
    //     --include = 'snort3_community.rules'
    // }

    // ---------------------------------------------------------------------------
    // -- 7. configure filters
    // ---------------------------------------------------------------------------

    // ---------------------------------------------------------------------------
    // -- 8. configure outputs
    // ---------------------------------------------------------------------------

    // -- event logging
    // -- you can enable with defaults from the command line with -A <alert_type>
    // -- uncomment below to set non-default configs
    // alert_csv = 
    // {
    //     file = true,
    //     fields = { action, class, gid }
    // }
    // alert_fast = 
    // {
    //     file = true,
    //     packet = true
    // }
    // alert_full = 
    // {
    //     file = true,
    // }
    // alert_sfsocket = { }
    // alert_syslog = { }
    // unified2 = { }
    // --  packet logging
    // -- you can enable with defaults from the command line with -L <log_type>
    // log_codecs = { 
    //     file = true,
    //     msg = true
    // }
    // log_hext = 
    // {
    //     file = true,
    //     raw = true
    // }
    // log_pcap = { }
    // --  additional logs
    // packet_capture = { }
    // file_log =
    // {
    //     log_pkt_time = true,
    //     log_sys_time = true,
    // }
    //     `
    //     // console.log(lua)
    //     fs.writeFile("/home/payman/#Project/Full-Stack-Web-App/server/src/public/snort.lua", lua, (err) => {
    //         if (err) {
    //             console.log(err);
    //             return;
    //         }
    //         console.log("successfully");
    //     });

});

module.exports = router;