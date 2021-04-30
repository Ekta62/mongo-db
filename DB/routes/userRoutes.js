const express = require('express');

var myctrl = require('../controller/userController');

var routes=express.Router();

routes.post('/add',myctrl.addCompany);
routes.post('/addcompany',myctrl.mycompany);
routes.post('/addproduct',myctrl.myproduct);
routes.get('/product/:pid',myctrl.getproduct);
routes.put('/updateRecord/:id',myctrl.updatedData);
routes.get('/company/:cid',myctrl.getcompany);

module.exports=routes;