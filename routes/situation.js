const router = require("express").Router()
const controller = require("../controllers/situation")
router.post("/", controller.create)
router.put("/:id", controller.edit)
router.delete("/:id", controller.del)
router.get("/:id", controller.get)
router.get("/department/:id", controller.getByDepartment)
router.get("/", controller.getAll)

module.exports = router