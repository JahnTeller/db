const router = require("express").Router()
const controller = require("../controllers/diagnose")
router.post("/", controller.create)
router.put("/:id", controller.edit)
router.delete("/:id", controller.del)
router.get("/:id", controller.get)
// router.get("/situation/:id", controller.getBySituation)
router.get("/", controller.getAll)
module.exports = router