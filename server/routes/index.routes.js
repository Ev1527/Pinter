const router = require("express").Router();

const authApiRouter = require("./api/auth.routes");

router.use("/api/auth", authApiRouter);

module.exports = router;
