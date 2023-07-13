const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.requireSignIn = async (req, res, next) => {

  try{
    const token = req.headers.authorization.split(" ")[1]
    const user = jwt.verify(token , process.env.JSONWEBTOKEN)
    req.user = user
    next()

  }catch(err){ return res.status(401).json({message:'Authorization required'}) }

}
exports.adminMiddleWare = async(req,res,next)=>{

  if(req.user.role !== 'admin'){
    return res.status(401).json({msg:'Access denied'})
  }
  next()

}

exports.userMiddleWare = async(req,res,next)=>{

  try{

    if(req.user.role !== 'user'){
      return res.status(400).json({msg:'Access denied'})
    }
    next()

  }catch(err){return res.status(400).json({msg:'admin access denied!'})}

}