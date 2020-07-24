const mongoose = require('mongoose');

let Order = new mongoose.Schema({
    order:{
        type:String
    },
    quantity:{
        type:Number
    },
    left:{
        type:Number
    },
    customer:{
        type:String
    },
    status:{
        type:String
    },
    rating:{
        type:Number
    },
    review:{
        type:String
    }
});

module.exports = mongoose.model('Order', Order);