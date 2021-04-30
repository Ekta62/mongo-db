const mongoose = require('mongoose');

var newUserSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name should be entered'],
        maxlength:10
    },
    email:{
        type:String,
        unique:[true,'Email should not be same'],
    },
    marks:{
        type:Number,
        required:true,
        max:[6,'Number should not be greater than 6'],
        min:[2,'Number should not be less than 2']
    },
    contact:{
        type:Number,
        required:true,
    }
});
mongoose.model('register',newUserSchema);