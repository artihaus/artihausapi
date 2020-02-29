const router = require('express').Router();
const ArtihausProjectsController = require('../../controllers/artihaus-projects-controller');

// Matches with '/api/jobs'
router.route('/create')
.post(ArtihausProjectsController.create)

router.route('/read')
.get(ArtihausProjectsController.read)

router.route('/read-latest')
.get(ArtihausProjectsController.read_latest)

router.route('/read-false')
.get(ArtihausProjectsController.read_false)

router.route('/read/:_id')
.get(ArtihausProjectsController.read_id)

router.route('/update')
.post(ArtihausProjectsController.update)

router.route('/delete')
.post(ArtihausProjectsController.delete)


module.exports = router;