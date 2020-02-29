const router = require('express').Router();
const ArtihausClientsController = require('../../controllers/artihaus-clients-controller');

// Matches with '/api/Users'
router.route('/create')
.post(ArtihausClientsController.create)

router.route('/read')
.get(ArtihausClientsController.read)
.post(ArtihausClientsController.read)



module.exports = router;