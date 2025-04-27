const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const procurementSchema = new mongoose.Schema({
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
    
    dealername:{
        type:String,
        trim:true,
        required:true,
        

    },
    branch:{
        type:String,
        trim:true,
        required:true,
    },
    contact:{
        type:Number,
        trim:true,
        required:true,
    },
    unitprice:{
        type:Number,
        trim:true,
        required:true,
    },



}); 

module.exports = mongoose.model('produce', procurementSchema);