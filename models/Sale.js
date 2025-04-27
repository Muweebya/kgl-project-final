const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const salesSchema = new mongoose.Schema({
    producename:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"produce",
        
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
        type:mongoose.Schema.Types.ObjectId,
        ref:"registration",
        

    },
    paymentmethod:{
        type:String,
        trim:true,
        required:true,
    },
    branch:{
        type:String,
        trim:true,
        required:true,
    }


}); 

module.exports = mongoose.model('sale', salesSchema);