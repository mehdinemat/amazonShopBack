
const Category = require('../models/category')
const slugify = require('slugify')

exports.addCategory =  async (req, res, next) => {

  try{
    const categoryObj = {
      name: req.body.name,
      slug: slugify(req.body.name)
    }
    if (req.body.parentId) {
      categoryObj.parentId = req.body.parentId
    }
  
    const cat = new Category(categoryObj)
    await cat.save()
  
    return res.status(201).json({ msg: 'valid' })

  }catch(err) {return res.status(201).json({msg:err.message})}

}
exports.getCategory = async(req,res)=>{

  try{

    const category = await Category.find({})

    return res.status(201).json({category})

  }catch(err){ return res.status(400).json({msg:err.message})}


}