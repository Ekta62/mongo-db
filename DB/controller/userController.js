require('../models/userModel');
require('../models/companyModel');
require('../models/productModel');
const mongoose = require('mongoose');

var comp = mongoose.model('company');
var mycom=mongoose.model('comp');
var mypro=mongoose.model('product');


// For embedded document
module.exports.addCompany=(req,res)=>{
    var newComp=new comp({
        name:req.body.cname,
        address:req.body.cadd,
        product:req.body.cproduct

    });
    newComp.save().then((docs)=>{
        return res.status(200).json({
            success:true,
            message:'Company created',
            data:docs
        })
    })
    .catch((err)=>{
        return res.status(400).json({
            success:false,
            message:'Error in creating Company',
            error:err.message
        })
    })
}

//Update User details(for embedded document)
module.exports.updatedData=(req,res)=>{
    var updatedData = req.body;
    comp.findByIdAndUpdate({_id:req.params.id},{$set:updatedData},{new:true})
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

//add company(for reference document)
module.exports.mycompany=(req,res)=>{
    var newmycom=new mycom({
        cname:req.body.cnm,
        cadd:req.body.caddress,
        product:req.body.pro_id
    });
    newmycom.save().then((docs)=>{
        return res.status(200).json({
            success:true,
            message:'new Company created',
            data:docs
        })
    })
    .catch((err)=>{
        return res.status(401).json({
            success:false,
            message:'Error in adding new company',
            error:err.message
        })
    })
}

//add product(for reference document)
module.exports.myproduct=(req,res)=>{
    var newmypro=new mypro({
        pname:req.body.pnm,
        price:req.body.pp,
        // company:req.body.comp_id
    });
    newmypro.save().then((docs)=>{
        return res.status(200).json({
            success:true,
            message:"new product added",
            data:docs
        })
    })
    .catch((err)=>{
        return res.status(400).json({
            success:false,
            message:"error in adding product",
            error:err.message
        })
    })
}

//get information in reference document(in product part get company detail)
module.exports.getproduct=(req,res)=>{
    return mypro.findById({_id:req.params.pid}).populate('company').exec().then((docs)=>{
        res.status(200).json({
            success:true,
            message:'Product list',
            data:docs
        })
    })
    .catch((err)=>{
        res.status(400).json({
            success:false,
            message:'not found',
            error:err.message
        })
    })
}

//get information in reference document(in company part get product detail)
module.exports.getcompany=(req,res)=>{
    return mycom.findById({_id:req.params.cid}).populate('product').exec().then((docs)=>{
        res.status(200).json({
            success:true,
            message:'Product list',
            data:docs
        })
    })
    .catch((err)=>{
        res.status(400).json({
            success:false,
            message:'not found',
            error:err.message
        })
    })
}