require('../model/userModel');
const mongoose = require('mongoose');

var UserData=mongoose.model('user');

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
