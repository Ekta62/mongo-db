require('../model/userModel');
require('../model/registerModel');
require('../model/adminModel');
require('../config/passportConfig');

const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserData=mongoose.model('user');
var regData=mongoose.model('register');
var adminData=mongoose.model('admin');

//Insert user
module.exports.addnew=(req,res)=>{

    var myData=new UserData({
        name:req.body.username,
        email:req.body.uemail,
        contact:req.body.ucontact,
        address:req.body.uadd
    });

    myData.save().then((docs)=>{
        return res.status(200).json({
            message:'Data inserted successfully',
            success:true,
            data:docs 
        })
    })
    .catch((err)=>{
        return res.status(401).json({
            message:'Error in adding new user',
            success:false,
            error:err.message
        })
    });


}

//fetch all the  users from the database or find()
module.exports.getAll=(req,res)=>{
    return UserData.find().then((docs)=>{
        res.status(200).json({
            success:true,
            message:'List of users',
            data:docs
        })
    })
    .catch((err)=>{
        res.status(401).json({
            success:false,
            message:'Error in finding records of user',
            error:err.message
        })
    })
}

//find or select user by using findById()
module.exports.selectedData = (req,res)=>{
    const uid = req.params.userid;

    UserData.findById({_id:uid}).then((docs)=>{
        return res.status(200).json({
            success:true,
            message:'Record found',
            data:docs
        })
    })
    .catch((err)=>{
        return res.status(401).json({
            success:false,
            message:'no record found',
            error:err.message
        })
    })
}


//findOne
module.exports.selectedUser=(req,res)=>{
    UserData.findOne({name:req.params.name})
    .then((docs)=>{
        return res.status(200).json({
            success:true,
            message:'Record found',
            data:docs
        })
        .catch((err)=>{
            return res.status(401).json({
                success:false,
                message:'no record found',
                error:err.message
            })
        })
    })
}


//Update User details
module.exports.updatedData=(req,res)=>{
    
    // var updatedData={
    //     name:req.body.uname,
    //     email:req.body.email,
    //     contact:req.body.contact,
    //     address:req.body.add
    // }

    var updatedData = req.body;

    // const id=req.params.id;
    UserData.findByIdAndUpdate({_id:req.params.id},{$set:updatedData},{new:true})
    .then((docs)=>{
        return res.status(200).json({
            success:true,
            message:'Data updated',
            data:docs
        })
        .catch((err)=>{
            return res.status(401).json({
                success:false,
                message:'Error in updating data',
                err:err.message
            })
        })
    })

}

//Update User details
module.exports.updatedUser=(req,res)=>{
    var updatedData = req.body;
    UserData.findOneAndUpdate({email:req.params.email},{$set:updatedData},{new:true})
    .then((docs)=>{
        return res.status(200).json({
            success:true,
            message:'Data updated',
            data:docs
        })
        .catch((err)=>{
            return res.status(401).json({
                success:false,
                message:'Error in updating data',
                err:err.message
            })
        })
    })

}

//DeleteById() user
module.exports.deleteUser=(req,res)=>{
    UserData.findByIdAndDelete({_id:req.params.id})
    .then((docs)=>{
        return res.status(200).json({
            success:true,
            message:'User deleted successfully',
            data:docs
        })
        .catch((err)=>{
            return res.status(401).json({
                success:false,
                message:'Error in deleting',
                err:err.message
            })
        })
    })
}

//deletebyname
module.exports.deleteName=(req,res)=>{
    UserData.findOneAndDelete({name:req.params.name})
    .then((docs)=>{
        return res.status(200).json({
            success:true,
            message:'User deleted successfully',
            data:docs
        })
        .catch((err)=>{
            return res.status(401).json({
                success:false,
                message:'Error in deleting',
                err:err.message
            })
        })
    })
}

//register user
module.exports.registerData=(req,res)=>{
    var newRegd=new regData({
        name:req.body.uname,
        email:req.body.uemail,
        marks:req.body.umarks,
        contact:req.body.ucontact
    });
    newRegd.save().then((docs)=>{
        return res.status(200).json({
            success:true,
            message:'New user registered',
            data:docs
        })
    })
    .catch((err)=>{
        return res.status(401).json({
            success:false,
            message:'Error in registering user',
            error:err.message
        })
    })
}

//admin module 
module.exports.addAdmin=(req,res)=>{
    var adData=new adminData({
        name:req.body.uname,
        email:req.body.uemail,
        contact:req.body.ucontact,
        password:req.body.upass
    });
    adData.save().then((docs)=>{
        return res.status(200).json({
            success:true,
            message:'New Data recorded',
            data:docs
        })
    })
    .catch((err)=>{
        return res.status(401).json({
            success:false,
            message:'Error in adding data',
            error:err.message
        })
    })
}

//to check authentication
module.exports.authenticate=(req,res,next)=>{
    passport.authenticate('local',(err,user,info)=>{
        if(err) return res.status(404).json(err);
        if(user) return res.status(200).json({
            "token":jwt.sign({_id:user._id},"SecretToken",{expiresIn:'20m'}),
            "user":user
        });
        if(info) return res.status(401).json(info);
    })(req,res,next)
}

//verify Token
module.exports.userProfile=(req,res,next)=>{
    const id=req._id;
    adminData.find({_id:id}).then((docs)=>{
        return res.status(200).json({
            success:true,
            message:'user record found',
            data:_.pick(docs,['name','email','contact'])
        })
    })
    .catch((err)=>{
        return res.status(401).json({
            sucess:false,
            message:'Error finding records',
            error:err.message
        })
    })
}