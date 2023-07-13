const { default: slugify } = require('slugify')
const Product = require('../models/product')
const shortId = require('shortid')


exports.createProduct = async(req,res)=>{

  const { name , price ,description , productPicture , category , createdBy} = req.body

const  productPictures = []

  if(req.file.length > 0){
    req.files.map((file)=>{
      return {img:file.filename}
    })
  }

  const product = new Product({
    name , slug:slugify(name) , price , description , productPicture:productPictures , category , createdBy
  })

  await product.save()

  res.status(200).json({file:req.file , body:req.body})

}