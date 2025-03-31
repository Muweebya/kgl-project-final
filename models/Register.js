//defining our schema
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const registrationSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        
    },

    role:{
        type:String,
        trim:true,
        required:true,

    },
    branch: {
        type:String,
        trim:true,
        required:true,

    },
    emailaddress:{
        type:String,
        trim:true,
        required:true,
        unique:true,

    },
    password:{
        type:String,
        trim:true,
        required:true,
        unique:true,

    },
    passwordrepeat:{
        type:String,
        trim:true,
        required:true,
        unique:true,

    }
});
registrationSchema.plugin(passportLocalMongoose,{
    usernameField: 'emailaddress'
    
})
module.exports = mongoose.model('registration', registrationSchema);