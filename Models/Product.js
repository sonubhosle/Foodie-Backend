const mongoose = require('mongoose');



const productSchema = new mongoose.Schema({

    title: {
        type: String,
        required: ['Please Enter Product Title', true]
    },
    brand: {
        type: String,
        required: ['Please Enter Product Brand', true]
    },
    image: {
        type: String,
        required: ['Please Enter Product Image Url', true]
    },
    price: {
        type: Number,
        required: ['Please Enter Product Price', true]
    },
    discountedPrice: {
        type: Number,
        required: ['Please Enter Product Discounted Price', true]
    },

    discountPersent: {
        type: Number,
        required: ['Please Enter Product Discount Persent', true]
    },
    quantity: {
        type: Number,
        required: ['Please Enter Product Quantity', true]

    },

    category: {
        type: String,
        required: ['Please Enter Product Category', true]
    },
    description: {
        type: String,
        required: ['Please Enter Product Description', true]
    },

    ratings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ratings',
        }
    ],

    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'review',
        }
    ],

    numRatings: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

})



const Product = mongoose.model('products', productSchema);

module.exports = Product;