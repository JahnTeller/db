const router = require("express").Router();
const controller = require("../controllers/situation");
const { verifyAdmin, verifyToken } = require("../middlewares/middleware");
router.put("/:id", verifyToken, controller.edit);
router.delete("/:id", verifyToken, controller.del);
router.get("/page/:page", controller.pagination);
router.get("/department/:id", controller.getByDepartment);
router.get("/search", controller.search);
router.post("/submit", verifyToken, controller.submit);
router.post("/", controller.create);
router.get("/:id", controller.get);
router.get("/", controller.getAll);

module.exports = router;
