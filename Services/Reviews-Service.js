const Review = require('../models/Review');
const Product_Service = require('../services/Product-Service');

const createReview = async (reqData, user) => {
    try {
        // Find the product
        const product = await Product_Service.findProductById(reqData.productId);
        if (!product) {
            throw new Error('Product not found');
        }

        // Create the review
        const review = new Review({
            user: user._id,
            product: product._id,
            title: reqData.title || '',
            description: reqData.description,
            createdAt: new Date(),
        });

        // Save the review
        const savedReview = await review.save();

        // Update the product's reviews array and numReviews
        product.reviews.push(savedReview._id);
        product.numReviews += 1; // Increment numReviews
        await product.save();

        // Update the user's reviews array
        user.reviews.push(savedReview._id);
        await user.save();

        return savedReview;
    } catch (error) {
        console.error('Error creating review:', error);
        throw error;
    }
};

const getAllReviewsByProductId = async (productId) => {
    try {
      const reviews = await Review.find({ product: productId })
        .populate('user') 
        .exec();
  
      return reviews;
    } catch (err) {
      console.error("Error fetching reviews:", err);
      throw err;
    }
  };


module.exports = { createReview,getAllReviewsByProductId };
