const express = require('express');
const router = express.Router()
const Model = require('../models/siteModel')

// Get all site 
router.get('/find', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/find/:borough', async (req, res) => {
    try {
        const data = await Model.find({ borough: req.params.borough }).exec();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})



module.exports = router;