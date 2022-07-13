const router = require("express").Router();
const controller = require("../controllers/user");
const { verifyAdmin, verifyToken } = require("../middlewares/middleware");
router.post("/login", controller.login);
router.post("/register", verifyAdmin, controller.register);
router.get("/role", verifyToken, controller.getByRole);
router.get("/", controller.getAll);
module.exports = router;
