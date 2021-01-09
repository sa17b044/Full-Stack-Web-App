const {
    Router
} = require("express");
const fs = require("fs");
const XML_Model = require("/home/payman/#Project/Full-Stack-Web-App/server/src/models/xml_schema.js");
const {
    connected
} = require("process");
const multer = require("multer");
const router = Router();
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/home/payman/#Project/Full-Stack-Web-App/server/src/public')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
var upload = multer({
    storage: storage
})
router.get("/", async (req, res) => {
    try {
        const xmlList = await XML_Model.find();
        console.log(xmlList);
        if (!xmlList) throw new Error("No item List");
        const stored = xmlList.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
        res.status(200).json(stored);
        console.log(req.body);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

router.post("/", upload.single('file'), async (req, res) => {
    // console.log(req.file)
    // let name = req.file.originalname
    const newXmlList = new XML_Model(req.file);
    try {
        const xmlList = await newXmlList.save();
        if (!xmlList) throw new Error("wrong saving");
        res.status(200).json(xmlList);
        console.log(req.body);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
    // let inputs = req.body.inputs;
    // let elementArr = [];
    // inputs.forEach((element) => {
    //     elementArr.push(element)
    //     if (element.name === '') {
    //         delete element.name
    //     } else {
    //         element.name = `Name="${element.name}"`
    //     }
    //     if (element.address === '') {
    //         delete element.address
    //     } else {
    //         element.address = `Address="${element.address}"`
    //     }
    //     if (element.dpts === '') {
    //         delete element.dpts
    //     } else {
    //         element.dpts = `DPTs="${element.dpts}"`
    //     }
    //     if (element.max === '') {
    //         delete element.max
    //     }  else {
    //         element.max = `max="${element.max}"`
    //     }
    //     if (element.min === '') {
    //         delete element.min
    //     } else {
    //         element.min = `min="${element.min}"`
    //     }
    //     if (element.ia === '') {
    //         delete element.ia
    //     } else {
    //         element.ia = `ia="${element.ia}"`
    //     }
    //     if (element.central === '') {
    //         delete element.central
    //     } else {
    //         element.central = `Central="${element.central}"`
    //     }

    // })
    // elementArr = Object.values(elementArr)
    // let lineArry =[];
    // elementArr.forEach((el) => {
    //     lineArry.push(Object.values(el))
    // });
    // // console.log(lineArry)
    // const regex = /,/ig;
    // lineArry.forEach(str => {
    //     console.log(str)
    //     str = str.toString()

    //     let line = str.replace(regex," ");
    //     console.log(line)
    // });

    // xml = ``
    // fs.writeFile("/home/payman/#Project/Full-Stack-Web-App/server/src/public/knx.xml", xml, (err) => {
    //     if (err) {
    //         console.log(err);
    //         return;
    //     }
    //     console.log("successfully");
    // });

});
module.exports = router;