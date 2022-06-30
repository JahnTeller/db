const router = require("express").Router()
const controller = require("../controllers/department")
const { verifyAdmin, verifyToken } = require("../middlewares/middleware")
router.post("/",verifyToken,  controller.create)
router.put("/:id",verifyToken, controller.edit)
router.delete("/:id", verifyToken, controller.del)
router.get("/:id", controller.get)
router.get("/", controller.getAll)
module.exports = router