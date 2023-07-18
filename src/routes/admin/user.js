const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const {signup , signin , signout } = require('../../controllers/admin/user')
const {requireSignIn} = require('../../common-middleware/index')
const { validateSignUpRequest, validateSignInRequires , isRequestValidate } = require('../../validators/auth')

router.post('/admin/signin' ,validateSignInRequires , isRequestValidate ,  signin )
router.post('/admin/signup',validateSignUpRequest , isRequestValidate , signup  )
router.post('/admin/signout' , requireSignIn ,signout )
router.post('/admin/profile' , requireSignIn , (req,res)=>{
  return res.status(200).json({user:'profile'})
})


module.exports = router