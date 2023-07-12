const express = require('express')
const router = express.Router()
const slugify = require('slugify')
const {addCategory, getCategory} = require('../controllers/category')
const {requireSignIn , adminMiddleWare} = require('../common-middleware/index')
  router.post('/category/create' , requireSignIn , adminMiddleWare , addCategory )
  router.get('/category' , getCategory)
module.exports = router