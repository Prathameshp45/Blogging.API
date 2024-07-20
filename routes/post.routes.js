
const express = require ('express');
const postController = require('../Controllers/post.controller')
const authorise = require('../middleware/authorise')

const postrouter = express.Router();


postrouter.post('/addpost',postController.addpost)

postrouter.get('/getpost',postController.getpost);

postrouter.put('/updatepost/:id',postController.updatepost);

postrouter.delete('/deletepost/:id',postController.deletepost);

postrouter.get('/getpostbyId/:id',postController.getpostbyId);

postrouter.post('/:id/addcomments',authorise,postController.addComments);

postrouter.get('/:id/comments',postController.getComments);



module.exports = postrouter;