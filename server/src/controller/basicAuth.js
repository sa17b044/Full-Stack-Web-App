
const authUser = (req, res, next) => {
    console.log('REQ')
    console.log(req.user)
    if (req.user == null) {
        res.status(403)
        return res.send('You need to sign in')
    }
    next()
}

module.exports = {
    authUser,
}