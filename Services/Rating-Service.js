const Rating = require('../models/Rating');
const Product_Service = require('../services/Product-Service');
const Product = require('../Models/Product');
const User = require('../Models/User');

const createRating = async (reqData, user) => {
    try {
        const product = await Product_Service.findProductById(reqData.productId);
        if (!product) {
            throw new Error('Product not found');
        }

        const rating = new Rating({
            user: user._id,
            product: product._id,
            rating: reqData.rating,
            createdAt: new Date(),
        });

        const savedRating = await rating.save();

        // Update the user's ratings array
        await User.findByIdAndUpdate(user._id, {
            $push: { ratings: savedRating._id }
        });

        // Update the product's ratings array
        await Product.findByIdAndUpdate(product._id, {
            $push: { ratings: savedRating._id }
        });

        // Update the numRatings for the product
        await Product.findByIdAndUpdate(product._id, {
            $inc: { numRatings: 1 }  // Increment numRatings by 1
        });

        return savedRating;
    } catch (error) {
        console.error('Error creating rating:', error);
        throw error;
    }
};

const getAllRatings = async (productId) => {
    try {
        const product = await Product_Service.findProductById(productId);
        if (!product) {
            throw new Error('Product not found');
        }

        return await Rating.find({ product: productId }).populate('user', 'userName email');
    } catch (error) {
        console.error('Error fetching ratings:', error);
        throw error;
    }
};

module.exports = { createRating, getAllRatings };
