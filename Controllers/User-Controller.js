
const User_Service = require('../Services/User-Service')


const getUserProfile = async (req, res) => {
    try {
        const jwt = req.headers.authorization?.split(" ")[1];

        if (!jwt) {
            return res.status(401).send({ message: 'Token Not Found' });
        }

        const user = await User_Service.getUserProfileByToken(jwt);


        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const getAllUser = async (req, res) => {
    try {

        const users = await User_Service.getAllUsers();

        return res.status(200).send(users)

    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}


module.exports = { getUserProfile, getAllUser };