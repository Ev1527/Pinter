const router = require('express').Router();

const authApiRouter = require('./api/auth.routes');
const chatRoutes = require('./api/chat.routes');

router.use('/api/auth', authApiRouter);
router.use('/chat', chatRoutes);

module.exports = router;
