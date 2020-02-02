const router = require('express').Router();
const ArtihausTimeSheetController = require('../../controllers/artihaus-timesheet-controller');

// Matches with '/api/jobs'
router.route('/create')
.get(ArtihausTimeSheetController.create)

router.route('/read')
.get(ArtihausTimeSheetController.read)

router.route('/read/:_id')
.get(ArtihausTimeSheetController.read_id)

router.route('/update')
.post(ArtihausTimeSheetController.update)

router.route('/delete')
.get(ArtihausTimeSheetController.delete)


module.exports = router;