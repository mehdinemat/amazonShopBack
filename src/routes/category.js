const express = require('express')
const router = express.Router()
const slugify = require('slugify')

const {addCategory, getCategory} = require('../controllers/category')
const {requireSignIn , adminMiddleWare} = require('../common-middleware/index')
const multer = require('multer')
const shortId = require('shortid')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname) , 'uploads'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, shortId.generate() + '-' + file.originalname)
  }
})
const upload = multer({storage})
  router.post('/category/create' , requireSignIn , adminMiddleWare , upload.single('categoryImage') , addCategory )
  router.get('/category' , getCategory)
module.exports = router