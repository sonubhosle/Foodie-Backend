const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', 
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products', 
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});


const Rating = mongoose.model('ratings', ratingSchema); 

module.exports = Rating;
