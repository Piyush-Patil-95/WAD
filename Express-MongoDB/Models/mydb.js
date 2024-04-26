const mongoose = require('mongoose');

const mydbSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    addr: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Mydb", mydbSchema);
