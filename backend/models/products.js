const mongoose = require('mongoose');

let Product = new mongoose.Schema({
    name:{
        type:String
    },
    price:{
        type:Number
    },
    quantity:{
        type:Number
    },
    ordered:{
        type:Number
    },
    status:{
        type:String
    },
    owner:{
        type:String
    }
});

module.exports = mongoose.model('Product', Product);