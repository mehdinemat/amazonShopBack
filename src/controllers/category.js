
const Category = require('../models/category')
const slugify = require('slugify')

const createCategory = (categories , parentId = null)=>{

  const categoryList = []
  let category 
  if(parentId == null){
  category = categories.filter((item)=>item.parentId == undefined)
  }else {
  category = categories.filter((item)=>item.parentId == parentId)
  }

  for(let cate of category){
    categoryList.push({
      id:cate._id , 
      name:cate.name,
      slug:cate.slug,
      children:createCategory(categories , cate._id)
    })
  }

  return categoryList

}

exports.addCategory =  async (req, res, next) => {

  try{
    let categoryUrl
    const categoryObj = {
      name: req.body.name,
      slug: slugify(req.body.name),
      categoryImage : categoryUrl
    }
    
    console.log(req.files)
    if(req?.file?.length > 0){
      console.log(req.file)
      categoryUrl = process.env.API +'/public/' + req.file.filename
      categoryObj.categoryImage =categoryUrl
      console.log(req.file)
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

    const categories = await Category.find({})

    const categoryList = createCategory(categories)

    return res.status(201).json({categoryList})

  }catch(err){ return res.status(400).json({msg:err.message})}


}