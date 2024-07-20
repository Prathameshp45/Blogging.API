
const post = require('../models/post.model');

// function for Add Blogs

async function addpost(req,res){
    console.log("req.body Getpost****",req.body);
    try{
        const post = new post(req.body);  

        const result = await post.save();
        res
            .status(200)
            .send({message:"post added Successfully",task: result});
    } catch(error){
        res.status(500).send(error);
    }
}

// // function for get all Blogs
async function getpost(req, res) {
    console.log("**------**")
    try {
        result = await post.find();
        console.log(result);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}


// // function for get by id
async function getpostbyId(req, res) {
    console.log(req.params.id);
    ID = req.params.id;
    try {
        result = await post.findById(req.params.id);
        console.log(result);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

// function for delete application
async function deletepost(req, res) {
    console.log(req.params.id);
    ID = req.params.id;
    try {
        const post = await post.findByIdAndDelete(req.params.id);
        if(!post){
            res.status(400).send({message:"Blog Not Found"});
        }
        res.send({task:post,message:"post Deleted"})
    } catch (error) {
        res.status(500).send(error);
    }
}


// // function for update application

async function updatepost(req, res) {
    console.log("updatedpost req.params.id=",req.params.id);
    console.log("updatedpost req.body",req.body);


    try{
        const post = await post.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
        });
        if (!post){
            res.status(400).send({message:"post no found"});
        }
        res.status(200).send({message: "post updated", task: post});
    }catch(error){
        res.status(500).send(error);
    }
}

async function addComments(req,res){
    try {
       const id = req.params.id;
    //    console.log(req.params.id);
       const uId = req.user.id;
    //    console.log(req.user.id);
       const newcomment = req.body.Note;
        console.log(id,uId,newcomment);
        const result = await Blog.findById(id);
        // console.log(result);
        if(!result){
            res.status(400).send({message : "post not found"})
        }
        result.Comments.push({u_id : uId, Note : newcomment})
        await result.save();
        console.log(result.Comments);

        res.status(200).send({message : "Comments Added Successfully"})

    } catch (error) {
        res.status(500).send(error);
    }
}

async function getComments(req, res) {
    const id = req.params.id;
    console.log(req.params.id)
    try {
       
        const post = await post.findById(id).populate('Comments.Note'); 
        if (!post) {
            return res.status(404).send({ message: "post not found" });
        }
        res.status(200).send(post.Comments);
    } catch (error) {
        res.status(500).send(error);
    }
}


module.exports = {
    addpost,
    getpost,
    deletepost,
    updatepost,
    getpostbyId,
    addComments,
    getComments
}
