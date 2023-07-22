const Products = require('../../models/product')
const Category = require('../../models/category')

exports.initialData = async (req, res) => {
  try {
    const category = await Category.find({})
    const product = await Products.find({})

    return res.status(200).json({ category, product })

  } catch (err) { return res.status(400).json({ msg: err.message }) }
}