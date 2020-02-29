const router = require("express").Router();
const ArtihausExpensesController = require("../../controllers/artihaus-expenses-controller");

// Matches with "/api/jobs"
router.route("/create")
.post(ArtihausExpensesController.create)

router.route("/read")
.get(ArtihausExpensesController.read)
.post(ArtihausExpensesController.read)

router.route("/read-false")
.get(ArtihausExpensesController.read_false)

router.route("/read/:_id")
.get(ArtihausExpensesController.read_id)

router.route("/update")
.post(ArtihausExpensesController.update)

router.route("/delete")
.get(ArtihausExpensesController.delete)


module.exports = router;