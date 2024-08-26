const express = require('express');
const Rating_Controller = require('../Controllers/Rating-Controller');
const authenticated = require('../Middlewares/Authenticate');

const router = express.Router();

// Create a new rating
router.post('/ratings', authenticated, Rating_Controller.createRating);

// Get all ratings for a specific product
router.get('/ratings/:productId', Rating_Controller.getAllRatings);

module.exports = router;