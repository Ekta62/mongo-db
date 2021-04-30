const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

var adminSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name should be entered']
    },
    email:{
        type:String,
        unique:[true,'Email should not be same']
    },
    contact:{
        type:String,
        required:[true,'Contact should be entered']
    },
    password:{
        type:String,
        required:[true,'Password should be entered'],
        minlength:[5,'Password should not be greater than 5']
    },
    saltString:{type:String}
});

//methods for encrypting password
adminSchema.pre('save',function(next){
    bcrypt.genSalt(15,(err,salt)=>{
        bcrypt.hash(this.password,salt,(err,hash)=>{
            this.password=hash,
            this.saltString=salt
            next();
        })
    })

});

//decrypting password
adminSchema.methods.verifyPassword = function (password){
    return bcrypt.compareSync(password,this.password);
}

mongoose.model('admin',adminSchema);