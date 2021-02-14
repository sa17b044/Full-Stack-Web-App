
const authUser = (req, res, next) => {
    console.log('REQ')
    console.log(req.user)
    if (req.user == null) {
        res.status(403)
        return res.send('You need to sign in')
    }
    next()
}

function authRole(role) {
    return (req, res, next) => {
        console.log('role')
        console.log(req.user.role)
      if (req.user.role !== role) {
        res.status(401)
        return res.send('Not allowed')
      }
  
      next()
    }
  }
  
const login = (req,res,next) => {
    const userName = req.body.userName
    const password = req.body.password
}
  module.exports = {
    authUser,
    authRole
  }