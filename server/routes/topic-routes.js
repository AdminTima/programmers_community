const { Router } = require('express');
const topicController = require('../controllers/topic-controller');
const authMiddleware = require('../middleware/authMiddeware');

const topicRouter = Router();

topicRouter.post('/create', authMiddleware, topicController.createTopic);
topicRouter.get('/all', authMiddleware, topicController.getAllTopics);


module.exports = topicRouter;