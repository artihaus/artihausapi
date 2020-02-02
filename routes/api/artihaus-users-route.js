const router = require('express').Router();
const ArtihausUsersController = require('../../controllers/artihaus-users-controller');

// Matches with '/api/Users'
router.route('/read')
.get(ArtihausUsersController.read)



module.exports = router;