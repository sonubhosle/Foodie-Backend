const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: ["Enter Your User Name", true]
    },
    name: {
        type: String,
        required: ["Enter Your Name", true]
    },
    surname: {
        type: String,
        required: ["Enter Your Surname", true]
    },
    photo: {
        type: String,
        required: ["Enter Your Photo Url", true]
    },
    password: {
        type: String,
        required: ["Enter Your Password", true]
    },
    email: {
        type: String,
        required: ["Enter Your Email", true]
    },
    mobile: {
        type: String,
        required: ["Enter Your Mobile Number", true]
    },
    role: {
        type: String,
        required: true,
        enum: ['CUSTOMER', 'ADMIN'],
        default: "CUSTOMER"
    },
    paymentInformation: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "PaymentInformation" 
    }],
    ratings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ratings" 
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "reviews" 
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('users', userSchema);

module.exports = User;
