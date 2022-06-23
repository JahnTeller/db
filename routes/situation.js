const router = require("express").Router()
const controller = require("../controllers/situation")
const { verifyAdmin, verifyToken} = require("../middlewares/middleware")
router.post("/",verifyToken, verifyAdmin, controller.create)
router.put("/:id",verifyToken, verifyAdmin, controller.edit)
router.delete("/:id",verifyToken, verifyAdmin, controller.del)
router.post("/search", controller.search )
router.get("/page/:page", controller.pagination)
router.get("/department/:id",verifyToken, verifyAdmin, controller.getByDepartment)
router.get("/:id", controller.get)
router.get("/", controller.getAll)

module.exports = router