const router = require('express').Router();
const ArtihausWebAppController = require('../../controllers/artihaus-web-app-controller');

// Matches with '/api/Users'
router.route('/')
.get(ArtihausWebAppController.read)



module.exports = router;