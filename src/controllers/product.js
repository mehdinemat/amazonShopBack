const { default: slugify } = require('slugify')
const Product = require('../models/product')
const shortId = require('shortid')
const Category = require('../models/category')

exports.createProduct = async (req, res) => {

  const { name, price, description, productPicture, category, createdBy, quantity } = req.body
  console.log(name, price, description, productPicture, category, createdBy, quantity)
  let productPictures
  if (req.files) {
    productPictures = req.files.map((file) => {
      return { img: file.filename }
    })
  }
  console.log(productPictures, 'step two')

  const product = new Product({
    name, slug: slugify(name), price, description, productPicture: productPictures, category, createdBy, quantity
  })

  await product.save()

  res.status(200).json({ file: req.file, body: req.body })

}
exports.getProducts = async (req, res) => {

  try {

    const productList = await Product.find({})
    return res.status(200).json({ productList })

  } catch (err) { return res.status(500).json({ msg: err.message }) }

}
exports.getProductBySlug = async (req, res) => {

  try {

    const { slug } = req.params
    const category = await Category.findOne({ slug: slug }).select('_id')

    if (!category) {
      return res.status(500).json({ msg: 'product with this category not found !' })
    }
    const product = await Product.find({ category: category._id })

    return res.status(200).json({
      product, productByPrice: {
        under500000: product.filter((item) => (item.price < 500000))
        , under1000000: product.filter((item) => (item.price < 1000000 && item.price >= 500000))
        , under5000000: product.filter((item) => (item.price < 5000000 && item.price >= 1000000)),
        under10000000 :product.filter((item)=>(item.price < 10000000 && item.price >= 5000000)),
        under20000000 : product.filter((item)=>(item.price < 20000000 && item.price >= 10000000))
      }
    })

  } catch (err) { return res.status(500).json({ msg: err.message }) }

}