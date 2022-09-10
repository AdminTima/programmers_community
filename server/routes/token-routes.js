const { Router } = require('express');
const tokenController = require('../controllers/tokens-controller');

const tokenRouter = Router();

tokenRouter.get('/refresh', tokenController.getNewTokens);

module.exports = tokenRouter;