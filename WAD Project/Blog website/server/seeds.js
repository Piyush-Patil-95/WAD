import mongoose from "mongoose";
import Blog from "./models/blog.js";
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));


mongoose.connect('mongodb://localhost:27017/blogWebsite',{useNewUrlParser:true, 'useUnifiedTopology':true})
.then(()=>{
    console.log("Connected");
})
.catch((err)=>{
    console.log("error")
})

const dummyBlogs = [
    {
        title: 'Sample Blog 1',
        description: 'Description for Sample Blog 1',
        imagePath: 'sample_images/sample1.jpg' // Adjust image path based on your directory structure
    },
    {
        title: 'Sample Blog 2',
        description: 'Description for Sample Blog 2',
        imagePath: 'sample_images/sample2.jpg'
    },
    // Add more blog objects as needed
];

// Function to read and save blogs
async function saveBlogs() {
    try {
        for (const blogData of dummyBlogs) {
            const imagePath = path.join(__dirname, blogData.imagePath);
            const imageData = fs.readFileSync(imagePath);

            const newBlog = new Blog({
                title: blogData.title,
                description: blogData.description,
                image: {
                    data: imageData,
                    contentType: 'image/jpg' // Adjust content type based on image format
                }
            });

            await newBlog.save();
            console.log(`Blog "${blogData.title}" saved to database.`);
        }

        console.log('All blogs saved successfully.');
        mongoose.disconnect(); // Disconnect from MongoDB after saving blogs
    } catch (error) {
        console.error('Error saving blogs:', error);
    }
}

// Call the function to save blogs
saveBlogs();