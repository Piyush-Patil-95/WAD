import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import multer from 'multer';
import Blog from './models/blog.js';
import path from 'path';
import fs from 'fs';

import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cors());
app.use(express.json());


const encodedPassword = encodeURIComponent('user@123');
const URL = `mongodb+srv://user:${encodedPassword}@blog-app.bfw5igp.mongodb.net/?retryWrites=true&w=majority&appName=blog-app`

mongoose.connect(URL,{useNewUrlParser:true, 'useUnifiedTopology':true})
.then(()=>{
    console.log("DataBase Connected Successfully");
})
.catch((err)=>{
    console.log(err)
})
app.use(express.urlencoded({extended:true}));

//to display images to frontend
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/',(req,res)=>{
    res.send("sfdhsfshdfgsdf")
})


app.get('/home',async (req,res)=>{
    const blogs =  await Blog.find({});
    res.send(blogs);
})


//for recieving blog data
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname))
    }
})

const upload = multer({ 
    storage:storage,
 });

app.post('/create',upload.single('file'),(req,res)=>{
    const { title, description } = req.body;
    const image = req.file.filename;

    Blog.create({title, description, image})
    .then(result=>{res.json(result)})
    .catch(err=>{console.log(err)})
})

// Update blog post
app.get('/blog/:id', async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      res.json(blog);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });



app.put('/update/:id', upload.single('file'), async (req, res) => {
    const { title, description } = req.body;
    let image = req.body.image; // In case image is not updated
    if (req.file) {
        image = req.file.filename; // Update image if a new file is uploaded
    }

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { title, description, image }, { new: true });
        res.json(updatedBlog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update blog post' });
    }
});

// Delete blog post
app.delete('/delete/:id', async (req, res) => {
    try {
      const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
      if (!deletedBlog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      // Optionally, you can remove the associated image file here if needed
      res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete blog post' });
    }
  });
  





app.listen(5000,()=>{
    console.log("\nServer Listening on Port 5000")
})