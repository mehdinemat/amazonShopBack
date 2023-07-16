const express = require('express')
const router = express.Router()
const {addToCart} = require('../controllers/cart')
const {requireSignIn ,  userMiddleWare} = require('../common-middleware/index')

  router.post('/user/cart/addtocart' , requireSignIn , userMiddleWare , addToCart)

module.exports = router