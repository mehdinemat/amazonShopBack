const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

  name:{
    type:String , required:true , trim:true 
  },
  slug:{
    type:String , required:true , unique:true
  },price:{
    type:Number , required:true
  },description:{
    type:String , required:true , trim:true
  },offer:{
    type:Number 
  },productPicture:[
    {img:{type:String}}
  ],
  reviews:[
    {   
      userId:{type:mongoose.Types.ObjectId , ref:'user'},
      review:{type:String}
    }
  ],quantity:{
    type:Number , required:true
  },
  category:{type:mongoose.Types.ObjectId , ref:'category'},
  createdBy:{type:mongoose.Types.ObjectId , ref:'user'},
  updatedAt:Date,
},{timestamps:true})

module.exports = mongoose.model('product', productSchema)