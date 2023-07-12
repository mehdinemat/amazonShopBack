const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.requireSignIn = async (req, res, next) => {

  try{
    const token = req.headers.authorization.split(" ")[1]
    const res = jwt.verify(token , process.env.JSONWEBTOKEN)
    const user = await User.findById(res._id)
    console.log(user)
    req.user = user
    next()

  }catch(err){ return res.status(401).json({message:'Authorization required'}) }

}
exports.adminMiddleWare = async(req,res,next)=>{
  console.log(req.user)
  if(req.user.role !== 'admin'){
    return res.status(401).json({msg:'Access denied'})
  }
  next()

}