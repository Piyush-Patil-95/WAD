
import mongoose from 'mongoose';


const blogSchema = new mongoose.Schema({
    image: String,
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
})

const Blog = mongoose.model('Blog',blogSchema);
export default Blog;
