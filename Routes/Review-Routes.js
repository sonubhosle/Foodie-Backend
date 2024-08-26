const express = require('express');
const router = express.Router();
const Review_Controller = require('../Controllers/Review-Controller');
const authenticate = require('../Middlewares/Authenticate')



// Create a new review
router.post('/reviews', authenticate, Review_Controller.createReview);
router.get('/reviews/:productId',  Review_Controller.getAllReviews);

module.exports = router;