const Site = require('../models/siteModel');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const siteController = {}

siteController.add = {
    // add new user-submited site 
}

siteController.delete = {
    // remove user-added site
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