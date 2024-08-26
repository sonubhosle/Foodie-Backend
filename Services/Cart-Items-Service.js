const CartItem = require('../Models/Cart_Items');
const User_Service = require('../Services/User-Service');


const updateCartItem = async (userId, cartItemId, cartItemData) => {
    try {

        const item = await findCartItemById(cartItemId);
        const user = await User_Service.findUserById(item.userId);

        if (!item) {
            throw new Error("Cart Item Not Found", cartItemId);
        }

        if (!user) {
            throw new Error("User Not Found", userId);
        }

        if (user._id.toString() === userId.toString()) {
            item.quantity = cartItemData.quantity;
            item.price = item.quantity * item.product.price;
            item.discountedPrice = item.quantity * item.product.discountedPrice;

            const updatedCartItem = await item.save();
            return updatedCartItem;
        }
        else {
            throw new Error("Use Can't Update This Item ");
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

const removeCartItem = async (userId, cartItemId) => {

    const cartItem = await findCartItemById(cartItemId);
    const user = await User_Service.findUserById(userId);

    if (user._id.toString() === cartItem.userId.toString()) {
       return  await CartItem.findByIdAndDelete(cartItemId)
    }

    throw new Error('You Cant Remove Another User Item')

}

const findCartItemById = async (cartItemId) =>{

    const cartItem = await  CartItem.findById(cartItemId).populate("product");
     
    if(cartItem){
        return cartItem;
    } else{
        throw new Error('Cart Item Not Found With',cartItemId);
    }


}



module.exports = {updateCartItem,removeCartItem,findCartItemById}