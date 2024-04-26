const express = require("express");
const mongoose = require('mongoose');

const url = 'mongodb+srv://zack30959:express@cluster0.kj5giuk.mongodb.net/Mydb';
const app = express();

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log("Connected to MongoDB");
});

mongoose.connection.on('error', (err) => {
    console.error("Error connecting to MongoDB:", err);
});

app.use(express.json());

const mydbRouter = require('./Routes/mydbroutes');
app.use('/', mydbRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
