

const User = require('../models/usermodel');
const jwt = require('jsonwebtoken');
const bcrypt = require ("bcryptjs");

async function registerUser(req, res){
    newMobile = req.body.username ;
    console.log(req.body);
    try {
        const userExists = await User.findOne({username : newusername});
        console.log(userExists);

        if(userExists){
            res.status(400).json({message : 'User already exists'})  
        }else{
            const user = new User(req.body);
            console.log(user);
            await user.save();
            res.status(201).json({message : 'Registration successful'})
        }
         
    } catch (error) {
        res.status(500).send(error);
    }
}


async function loginUser(req,res){
    try {
        newusername = req.body.username;
        password = req.body.password;
        const user = await User.findOne({username : newusername});

        if (!user) {
            res.status(400).send({ error : 'Invalid login credentials'});
        }
        isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(400).send({error : 'Password Incorrcet'});
        }
        const token = jwt.sign({_id : user._id},'prathamesh',{expiresIn : '1h'});
        res.status(200).send({acessToken : token,task : user});

    } catch (error) {
        res.status(500).send(error);
    }
}






module.exports = {
    registerUser,
    loginUser, 
    
} 