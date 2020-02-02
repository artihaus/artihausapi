const router = require("express").Router();
const ArtihausExpensesController = require("../../controllers/artihaus-expenses-controller");

// Matches with "/api/jobs"
router.route("/create")
.get(ArtihausExpensesController.create)

router.route("/read")
.get(ArtihausExpensesController.read)

router.route("/read/:_id")
.get(ArtihausExpensesController.read_id)

router.route("/update")
.post(ArtihausExpensesController.update)

router.route("/delete")
.get(ArtihausExpensesController.delete)


module.exports = router;