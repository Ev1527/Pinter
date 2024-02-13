const router = require("express").Router();

const authApiRouter = require("./api/auth.routes");
const roomApiRouter = require("./api/room.routes");

router.use("/api/auth", authApiRouter);
router.use("/api/room", roomApiRouter);


module.exports = router;
