const mongoose = require('mongoose');

var compSchema=mongoose.Schema({
    cname:{
        type:String
    },
    cadd:{
        type:String
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product'
}
});

mongoose.model('comp',compSchema);