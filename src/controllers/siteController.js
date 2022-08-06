const Site = require('../models/siteModel');

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

// retrieves specific site
siteController.getSite = async (req, res, next) => {
  try {
    const data = await Site.findById(req.params.id);
    res.json(data)
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// updates specific site
siteController.updateSite = async (req, res, next) => {
  try {
    const site = await Site.findById(req.params.id)
    if (site.user_submitted) {
      const data = await Site.findByIdAndUpdate(req.params.id, { ...req.body, user_submitted: true }, { new: true })
      res.json(data)
    }
    else {
      res.status(500).json({ message: 'Site is not user-submitted and cannot be changed' })
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
      res.status(500).json({ message: 'Site is not user-submitted and cannot be changed' })
    }

  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
}

siteController.addSite = async (req, res, next) => {
  // adds new site
  try {
    const data = await Site.create({ ...req.body, user_submitted: true });
    res.json(data)
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }

}




siteController.update = {
  // update user-added site
}

siteController.getAll = {
  // get all current sites 
}

siteController.get = {
  // should provide functionality to filter by Borough, currently open (month/day), can dispose meat,
}


module.exports = siteController