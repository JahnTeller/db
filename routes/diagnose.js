const router = require("express").Router();
const controller = require("../controllers/diagnose");
const { verifyToken, verifyAdmin } = require("../middlewares/middleware");
router.post("/", controller.create);
router.get("/search", controller.search);
router.put("/:id", verifyToken, controller.edit);
router.delete("/:id", verifyToken, controller.del);
router.get("/:id", controller.get);
// router.get("/situation/:id", controller.getBySituation)
router.get("/", controller.getAll);
router.get("/getbypreliminaryid/:preliminaryid", controller.getByPreliminary)
module.exports = router;
