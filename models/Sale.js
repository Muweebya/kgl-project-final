const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const salesSchema = new mongoose.Schema({
    producename:{
        type:String,
        trim:true,
        required:true,
        
    },

    buyersname:{
        type:String,
        trim:true,
        required:true,

    },
    dateandtime: {
        type:Date,
        trim:true,
        required:true,

    },
    tonnage:{
        type:Number,
        trim:true,
        required:true,
        

    },
    amountpaid:{
        type:Number,
        trim:true,
        required:true,
        

    },
    salesagent:{
        type:String,
        trim:true,
        required:true,
        

    },
    paymentmethod:{
        type:String,
        trim:true,
        required:true,
    }


}); 

module.exports = mongoose.model('sale', salesSchema);