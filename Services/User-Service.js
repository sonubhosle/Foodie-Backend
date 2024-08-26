const User = require('../Models/User');
const JWT_PROVIDER = require('../Config/JWT')
const bcrypt = require('bcrypt');

const createUser = async (userData) => {
    try {
        let { userName, name, surname, email, password, mobile, photo,role } = userData;

        
        // Validate role
        if (role && !['CUSTOMER', 'ADMIN'].includes(role)) {
            throw new Error('Invalid role');
        }
        

        role = role || 'CUSTOMER';

        const isUserExist = await User.findOne({ email, mobile });
        if (isUserExist) {
            throw new Error(`User Already Exists with email or mobile: ${email, mobile}`);
        }

        password = await bcrypt.hash(password, 10);

        const user = await User.create({ surname, name, userName, password, mobile, photo, email,role });

        return user;

    } catch (error) {
        throw new Error(error.message);
    }
}

const findUserById = async (userId) => {
    try {
        const user = await User.findById(userId).populate('reviews').populate('ratings');

        if (!user) {
            throw new Error(`User not found with ID: ${userId}`);
        }
        return user;
    } catch (error) {
        console.error('Error finding user by ID:', error.message);
        throw new Error(error.message);
    }
};

const findUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error(`User not found with email: ${email}`);
        }
        return user;
    } catch (error) {
        console.error('Error finding user by email:', error.message); // Log the error
        throw new Error(error.message); // Return the error message
    }
};

const getUserProfileByToken = async (token) => {
    try {
        const userId = JWT_PROVIDER.getUserIdFromToken(token);
        const user = await findUserById(userId);

        if (!user) {
            throw new Error('User Not Found');
        }

        return user;
    } catch (error) {
        console.error('Error fetching user profile:', error.message); // Log any errors
        throw new Error('Invalid Token or User Not Found');
    }
};



const getAllUsers = async () => {
    try {

        const users = await User.find();
        return users

    } catch (error) {
        throw new Error(error.message)
    }
}


module.exports = { createUser, findUserById, findUserByEmail, getUserProfileByToken, getAllUsers };
