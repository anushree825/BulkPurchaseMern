const mongoose = require('mongoose');

let Order = new mongoose.Schema({
    quantity:{
        type:Number
    },
    order:{
        type:String
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