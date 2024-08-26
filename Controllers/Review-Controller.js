const Review_Service = require('../Services/Reviews-Service');

const createReview = async (req, res) => {
    try {
        const user = req.user; 
        const review = await Review_Service.createReview(req.body, user);
        res.status(201).json(review);
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ message: error.message });
    }
};
const getAllReviews = async (req, res) => {
    const { productId } = req.params;
  
    try {
      const reviews = await Review_Service.getAllReviewsByProductId(productId);
      res.status(200).json(reviews);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching reviews', error: err.message });
    }
  };

module.exports = {
    createReview,
    getAllReviews
};
