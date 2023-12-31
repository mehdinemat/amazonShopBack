const express = require('express')
const { requireSignIn, adminMiddleWare } = require('../common-middleware')
const multer = require('multer')
const router = express.Router()
const {createProduct, getProducts, getProductBySlug} = require('../controllers/product')
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


  router.post('/product/create' , requireSignIn , adminMiddleWare , upload.array('productPicture') , createProduct)
  router.get('/products/:slug' ,getProductBySlug)
  router.get('/product' , getProducts )

module.exports = router