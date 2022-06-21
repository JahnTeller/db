const router = require("express").Router()
const controller = require("../controllers/department")

router.post("/", controller.create)
router.put("/:id", controller.edit)
router.delete("/:id", controller.del)
router.get("/:id", controller.get)
router.get("/", controller.getAll)
module.exports = router