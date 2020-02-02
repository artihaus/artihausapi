const router = require('express').Router();
const ArtihausWebAppController = require('../../controllers/artihaus-webapp-controller');

// Matches with '/api/Users'
router.route('/home')
.get(ArtihausWebAppController.home)



module.exports = router;