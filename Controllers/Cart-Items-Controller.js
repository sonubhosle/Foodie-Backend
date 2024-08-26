
const Cart_Item_Service = require('../Services/Cart-Items-Service')

const updateCartItem = async (req,res)=>{

    const user = await req.user;

    try {

       const updatedCartItem = await Cart_Item_Service.updateCartItem(user._id,req.params.id,req.body);

       return res.status(200).send(updatedCartItem);
        
    } catch (error) {
          
        return res.status(500).send ({error:error.message})
    }

}

const removeCartItem = async (req,res)=>{

    const user = await req.user;


    try {

      await Cart_Item_Service.removeCartItem(user._id,req.params.id);

       return res.status(200).send({message:'Cart Item Remove SuccessFullyt'});
        
    } catch (error) {
          
        return res.status(500).send ({error:error.message})
    }

}


module.exports = {updateCartItem,removeCartItem}