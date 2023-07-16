const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  user:{
    type:mongoose.Types.ObjectId , ref:'user' , required:true
  },cartItems:[
    {
      product:{type:mongoose.Types.ObjectId , ref:'product' , required:true},
      quantity:{type:Number , default:1},
      price:{type:Number , required:true}
    }
  ]

},{timestamps:true} )


module.exports = mongoose.model('cart', cartSchema)