const express = require('express')
const { requireSignIn } = require('../../common-middleware')
const {initialData} = require('../../controllers/admin/initialData')
const router = express.Router()

  router.get('/admin/initialdata'   , initialData)


module.exports = router