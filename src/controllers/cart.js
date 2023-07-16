const Cart = require('../models/cart')

exports.addToCart = async (req, res, next) => {

  try {
    const _res = await Cart.findOne({user:req.user._id})
    console.log(_res.cartItems)
    if(_res.cartItems.length > 0){
      
      console.log('this is item')
      const product = req.body.cartItems.product 
      const item = _res.cartItems.find(x=>x.product == product)

      if(item){

       const _= await Cart.findOneAndUpdate({"user":req.user._id , "cartItems.product":product },{
          "$set":{
            "cartItems":{
              ...req.body.cartItems , quantity:parseInt(item.quantity) + parseInt(req.body.cartItems.quantity)
            }
          }
        } )

        return res.status(200).json({_})

      }else{

        const myCart = await Cart.findOneAndUpdate({user:req.uesr._id} , {
          "$push":{
            "cartItems":req.body.cartItems
          }
        })
        return res.status(200).json({_})

      }


    }else{
      
      const cart = new Cart({
        user:req.user._id , 
        cartItems:req.body.cartItems
      })
  
      await cart.save()

      return res.status(200).json({cart})
    }


  } catch (err) { return res.status(401).json({ msg: err.message }) }


}