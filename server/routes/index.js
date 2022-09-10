const {Router} = require('express');
const userRouter = require('./user-routes');
const tokenRouter = require('./token-routes');
const roomRouter = require('./room-routes')
const topicRouter = require('./topic-routes');
const messageRouter = require('./message-routes');
//const realtimeRouter = require('./realtime-routes');
const authMiddleware = require('../middleware/authMiddeware');

const router = Router();


router.use('/user', userRouter);
router.use('/tokens', tokenRouter);
router.use('/room', authMiddleware, roomRouter);
router.use('/topic', authMiddleware, topicRouter);
router.use('/message', authMiddleware, messageRouter);
//router.use('/realtime', authMiddleware, realtimeRouter);


module.exports = router;