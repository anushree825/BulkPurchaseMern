const mongoose = require('mongoose');

let User = new mongoose.Schema({
    username: {
        type: String, required: true, unique: true
    },
    email: {
        type: String, required: true
    },
    password: {
        type: String, required: true
    },
    role: {
        type: String, required: true
    },
    ratings: {
        type: Number
    },
    rating_sum: {
        type: Number
    },
    review: {
        type: Array
    }
});

module.exports = mongoose.model('User', User);
