const express = require('express');
const router = express.Router();
const mydb = require('../Models/mydb');

router.get('/', async (req, res) => {
    try {
        const data = await mydb.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:name', async (req, res) => {
    try {
        const data = await mydb.findOne({ name: req.params.name });
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const newdata = new mydb({
        name: req.body.name,
        addr: req.body.addr
    });

    try {
        const r = await newdata.save();
        res.status(201).json(r);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
