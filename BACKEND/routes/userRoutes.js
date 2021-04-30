var express = require('express');
var myctrl = require('../controller/userController');
var approute=express.Router();
var jwt=require('../config/jwtHelpers');

approute.post('/newUser',myctrl.addnew);
approute.get('/allusers',myctrl.getAll);
approute.get('/selectRecord/:userid',myctrl.selectedData);
approute.put('/updateRecord/:id',myctrl.updatedData);
approute.delete('/deleteRecord/:id',myctrl.deleteUser)
approute.delete('/deleteUser/:name',myctrl.deleteName);
approute.get('/getUser/:name',myctrl.selectedUser);
approute.put('/updateUser/:email',myctrl.updatedUser);
approute.post('/reg',myctrl.registerData);
approute.post('/admin',myctrl.addAdmin);
approute.post('/auth',myctrl.authenticate);
approute.get('/profile',jwt.verifyJwtToken,myctrl.userProfile);

module.exports = approute;