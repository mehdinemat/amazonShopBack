const express = require('express')
const router = express.Router()
const User = require('../models/user')
const {signup , signin , signout } = require('../controllers/user')
const {requireSignIn} = require('../common-middleware/index')
const { check } = require('express-validator')
const {validateSignUpRequest, validateSignInRequires , isRequestValidate} = require('../validators/auth')

router.post('/signin' ,validateSignInRequires , isRequestValidate, signin )
router.post('/signup', validateSignUpRequest , isRequestValidate ,signup  )
router.post('/signout' ,requireSignIn ,signout )

router.post('/profile' , requireSignIn , (req,res)=>{
  return res.status(200).json({user:'profile'})
})


module.exports = router