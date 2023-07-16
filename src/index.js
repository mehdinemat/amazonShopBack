const express = require('express')
const dotenv = require('dotenv')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
dotenv.config()
const authRoutes = require('./routes/user')
const authAdminRoutes = require('./routes/admin/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const cartRoutes = require('./routes/cart')

app.use(bodyParser.json())

app.use('/public' , express.static(path.join(__dirname , 'uploads')))
app.use('/api' , authRoutes)
app.use('/api' , authAdminRoutes)
app.use('/api' , categoryRoutes)
app.use('/api' , productRoutes)
app.use('/api' , cartRoutes)

app.listen(process.env.PORT , ()=>{
  console.log('we are on port 2000')
})
const URL = process.env.MONGO_URL

mongoose.set("strictQuery", false);

mongoose.connect(URL , console.log('we are connect to mongo'))