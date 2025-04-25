const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const creditSchema = new mongoose.Schema({
    buyername:{
        type:String,
        trim:true,
        required:true,
        
    },

    location:{
        type:String,
        trim:true,
        required:true,

    },
    nationalid: {
        type:String,
        trim:true,
        required:true,

    },
    contact:{
        type:Number,
        trim:true,
        required:true,
        

    },
    duedate:{
        type:Date,
        trim:true,
        required:true,
        

    },
    dateofdispatch:{
        type:Date,
        trim:true,
        required:true,
        

    },
    producename:{
        type:String,
        trim:true,
        required:true,
    },
    typeofproduce:{
        type:String,
        trim:true,
        required:true,
    },
    tonnage:{
        type:Number,
        trim:true,
        required:true,
    },
    amountdue:{
        type:Number,
        trim:true,
        required:true,
    },
    salesagentname:{
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

module.exports = mongoose.model('creditor', creditSchema);