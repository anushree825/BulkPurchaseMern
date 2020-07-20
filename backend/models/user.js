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
    role:{
        type: String, required: true
    }
});

module.exports = mongoose.model('User', User);
