const router = require("express").Router();
const ArtihausEarningsController = require("../../controllers/artihaus-earnings-controller");

// Matches with "/api/jobs"
router.route("/create")
.post(ArtihausEarningsController.create)

router.route("/read")
.get(ArtihausEarningsController.read)
.post(ArtihausEarningsController.read)

router.route("/read/:_id")
.get(ArtihausEarningsController.read_id)

router.route("/update")
.post(ArtihausEarningsController.update)

router.route("/delete")
.post(ArtihausEarningsController.delete)


module.exports = router;