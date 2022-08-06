const express = require('express');
const router = express.Router()
const Site = require('../../models/siteModel')
const siteController = require('../../controllers/siteController')


// Get all sites
router.get('/', siteController.getAllSites)

// get site by ID
router.get('/:id', siteController.getSite)

// add new user
router.post('/', siteController.addSite)

// update the user new user
router.patch('/:id', siteController.updateSite)

// delete user submitted site
router.delete('/:id', siteController.deleteSite)


module.exports = router;