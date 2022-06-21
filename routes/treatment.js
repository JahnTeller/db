const router = require("express").Router()
const controller = require("../controllers/treatment")

router.post("/", controller.create)
router.put("/:id", controller.edit)
router.delete("/:id", controller.del)
router.get("/:id", controller.get)
// router.get("/diagnose/:id", controller.getByDiagnose)
router.get("/", controller.getAll)
module.exports = router