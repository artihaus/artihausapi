const router = require('express').Router();
const ArtihausProjectsController = require('../../controllers/artihaus-projects-controller');

// Matches with '/api/jobs'
router.route('/create')
.get(ArtihausProjectsController.create)

router.route('/read')
.get(ArtihausProjectsController.read)

router.route('/read/:_id')
.get(ArtihausProjectsController.read_id)

router.route('/update')
.post(ArtihausProjectsController.update)

router.route('/delete')
.get(ArtihausProjectsController.delete)


module.exports = router;