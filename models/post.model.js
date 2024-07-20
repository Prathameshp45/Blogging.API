const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: { type: String },
    content: { type: String },
    Comments : [{
        u_id : {type : mongoose.Schema.Types.ObjectId, ref :'User'},
        Note : {type : String}
    }]
})

const post = mongoose.model("post", postSchema);
module.exports = post;

// {
//    "title":"TCS"
//       "position":"HR Manager"
//       "status":"Fresher"
//       "Date_applied":"21-11-2023"
// }


