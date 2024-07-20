
const express = require ('express');
const userController = require('../Controllers/usercontroller');
const authorise = require('../middleware/authorise')

const userrouter = express.Router();

userrouter.post('/register',userController.registerUser);
// http://localhost:4005/api/register

userrouter.post('/login',userController.loginUser);
// http://localhost:4005/api/login


module.exports = userrouter;