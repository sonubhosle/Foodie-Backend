const User_Service = require('../Services/User-Service');
const JWT_PROVIDER = require('../Config/JWT');
const bcrypt = require('bcrypt')
const Cart_Services = require('../Services/Cart-Services')

const register = async (req, res) => {
    try {

        const user = await User_Service.createUser(req.body);
        const jwt = JWT_PROVIDER.generateToken(user._id);
          await Cart_Services.createCart(user);

        return res.status(200).send({ jwt, message: 'Register User' });

    } catch (error) {
        return res.status(500).send({ error: error.message });

    }
}

const login = async (req, res) => {
    const { password, email, userName } = req.body;

    try {
        let user;

        if (email) {
            user = await User_Service.findUserByEmail(email);
        } else if (userName) {
            user = await User_Service.findUserByUserName(userName);
        } else {
            return res.status(400).send({ message: 'Please provide either email or userName.' });
        }

        if (!user) {
            return res.status(404).send({ message: 'User not found with the provided email or userName.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send({ message: 'Invalid Password' });
        }

        const jwt = JWT_PROVIDER.generateToken(user._id);

        return res.status(200).send({ 
            jwt, 
            message: 'Login Success',
            userName: user.userName // Include the userName in the response
        });

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}



module.exports = { register, login }