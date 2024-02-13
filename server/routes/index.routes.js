const router = require('express').Router();

const authApiRouter = require('./api/auth.routes');
const chatRoutes = require('./api/chat.routes');
const partyApiRouter = require('./api/party.routes');
const roomApiRouter = require('./api/room.routes');

router.use('/api/auth', authApiRouter);
router.use('/api/room', roomApiRouter);
router.use('/api/party', partyApiRouter);
router.use('/chat', chatRoutes);

module.exports = router;
