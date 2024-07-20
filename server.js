
const express = require ('express');
const bodyParser = require('body-parser');
const userrouter = require('./routes/user_routes');
const postrouter = require('./routes/post.routes');

const {connectDB}= require('./config/db');

const app = express();


app.use(express.json());
app.use(bodyParser.json());

connectDB();

app.use('/User', userrouter);
app.use('/post', postrouter);


app.listen(5000,()=>{
    console.log("Server Started");
})

