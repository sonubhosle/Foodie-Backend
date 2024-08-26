
const Cart_Service = require('../Services/Cart-Services');


const findUserCart = async (req, res) => {

    const user = await req.user;

    try {

        const cart = await Cart_Service.findUserCart(user._id);
        return res.status(200).send(cart);

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}



const addItemToCart = async (req, res) => {

    const user = await req.user;

    try {

        const cartItem = await Cart_Service.addCartItem(user._id, req.body);

        return res.status(200).send(cartItem);

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}


module.exports = { findUserCart, addItemToCart };