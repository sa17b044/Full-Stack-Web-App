const Router = require("express");
const express = require('express')
// const app = express()
const router = Router();
const {
    authUser
} = require('../controller/basicAuth')
// const {
//     users
// } = require('../api/data')

const Users_Model = require("../models/userSchema.js");
router.use(express.json())

const setUser = async (req, res, next) => {
    // console.log('--##--##--##-- users')
    // console.log(users)
    console.log('--##--##--##--##-- req.body')
    console.log(req.body)
    console.log('--##--##--##--##-- req.body')
    const userId = req.body.userId
    console.log(userId)
    const users = await Users_Model.find({"userName": `${userId}`});
    console.log('--##--##--##-- result')
    console.log(users)
    if (userId) {
        req.user = users.find(user => user.userName === userId)
    }
    next()
}
router.use(setUser)
// const query = {
//             userName: `${userName}`
//         }
// const result = Users_Model.find(query);
// const userName = result.userName;

router.get("/dashboard", authUser, async (req, res) => {
    res.send('dashboard')
});
router.get("/admin", authUser ,async (req, res) => {
    res.send('admin')
});
router.get("/user", authUser ,async (req, res) => {
    res.send('user')
});
module.exports = router;