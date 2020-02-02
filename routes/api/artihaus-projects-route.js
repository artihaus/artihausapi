const router = require("express").Router();
const ArtihausJobsController = require("../../controllers/artihaus-projects-controller");

// Matches with "/api/jobs"
router.route("/create")
.get(ArtihausJobsController.create)

router.route("/read")
.get(ArtihausJobsController.read)

router.route("/read/:_id")
.get(ArtihausJobsController.read_id)

router.route("/update")
.post(ArtihausJobsController.update)

router.route("/delete")
.get(ArtihausJobsController.delete)


module.exports = router;