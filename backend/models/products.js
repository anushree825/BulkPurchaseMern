const mongoose = require('mongoose');

let Product = new mongoose.Schema({
    name:{
        type:String
    },
    price:{
        type:Number
    },
    // quantitiy given by vendor
    quantity:{ 
        type:Number
    },
    //quantity ordered in an order by a particular customer
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