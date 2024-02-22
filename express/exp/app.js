const express = require("express");
const app = express();

app.get("/",(req,res) => {
    res.sendFile(__dirname+"/public/home.html")
})

app.get("/about",(req,res) => {
    res.sendFile(__dirname+"/public/about.html")
})

app.get("/login",(req,res) => {
    res.sendFile(__dirname+"/public/login.html")
})

app.get("/contact",(req,res) => {
    res.sendFile(__dirname+"/public/contact.html")
})

app.listen(4000,()=>{
    console.log("Listening on port 4000")
});