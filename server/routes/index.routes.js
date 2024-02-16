const router = require("express").Router();

const authApiRouter = require("./api/auth.routes");
const partyApiRouter = require("./api/party.routes");
const roomApiRouter = require("./api/room.routes");
const messageApiRouter = require("./api/message.routes");

router.use("/api/auth", authApiRouter);
router.use("/api/room", roomApiRouter);
router.use("/api/party", partyApiRouter);
router.use('/api/message', messageApiRouter);

module.exports = router;
