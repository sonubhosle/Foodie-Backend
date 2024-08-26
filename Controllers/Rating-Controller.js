const Rating_Service = require('../Services/Rating-Service');

const createRating = async (req, res) => {
    try {
        const rating = await Rating_Service.createRating(req.body, req.user);
        res.status(201).json(rating);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const getAllRatings = async (req, res) => {
    try {
        const ratings = await Rating_Service.getAllRatings(req.params.productId);
        res.status(200).json(ratings);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createRating, getAllRatings };
