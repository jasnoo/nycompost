const express = require('express');
const router = express.Router()
const Model = require('../models/siteModel')

// Get all site 
router.get('/all', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;