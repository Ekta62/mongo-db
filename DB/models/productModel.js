require('./companyModel');
const mongoose = require('mongoose');

var productSchema=mongoose.Schema({
    pname:{
        type:String
    },
    price:{
        type:String
    },
    // company:{
    //         type:mongoose.Schema.Types.ObjectId,
    //         ref:'comp'
    // }
});

mongoose.model('product',productSchema);