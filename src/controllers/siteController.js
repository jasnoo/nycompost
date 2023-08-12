

const Site = require('../models/siteModel');
const mongoose = require('mongoose');


const siteController = {}

// retrieves all sites
siteController.getAllSites = async (req, res, next) => {
  try {
    const data = await Site.find();
    res.json(data)
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// confirms site ID is a valid mongo ID
siteController.confirmValidId = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(404).json({ message: 'ID does not exist' })
  } else {
    next();
  }
}

// retrieves specific site
siteController.getSite = async (req, res, next) => {
  try {
    const data = await Site.findById(req.params.id);
    if (!site) {
      res.status(404).json({ message: 'ID does not exist' })
    } else {
      res.json(data)
    }
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
}



// updates specific site
siteController.updateSite = async (req, res, next) => {
  try {
    const site = await Site.findbyId(req.params.id)
    if (!site) {
      res.status(404).json({ message: 'ID does not exist' })
    }
    if (site.user_submitted) {
      const data = await Site.findByIdAndUpdate(req.params.id, { ...req.body, user_submitted: true }, { new: true })
      res.json(data)
    }
    else {
      res.status(400).json({ message: 'Site is not user-submitted and cannot be changed' })
    }

  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// deletes specific site
siteController.deleteSite = async (req, res, next) => {
  try {
    const site = await Site.findById(req.params.id)
    if (site.user_submitted) {
      const data = await Site.findByIdAndRemove(req.params.id)
      res.json(data)
    }
    else {
      res.status(400).json({ message: 'Site is not user-submitted and cannot be changed' })
    }

  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
}

siteController.addSite = async (req, res, next) => {
  try {
    if (req.body.borough && req.body.location && req.body.address) {
      const data = await Site.create({ ...req.body, user_submitted: true });
      res.json(data)
    } else {
      res.status(400).json({ message: 'New compost sites require the borough, location, and address' })
    }
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
}




module.exports = siteController