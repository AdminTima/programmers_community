const { Router } = require('express');
const messageContoller = require('../controllers/message-controller');

const messageRouter = Router();

messageRouter.post('/new-msg',  messageContoller.newMessage);
messageRouter.get('/all/:roomId',  messageContoller.getRoomMessages);


module.exports = messageRouter;