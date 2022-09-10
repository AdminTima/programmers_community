const { Router } = require('express');
const usersController = require('../controllers/users-controller');
const authMiddleware = require('../middleware/authMiddeware');
const userRouter = Router();

userRouter.post('/sign-up', usersController.register);
userRouter.post('/set-photo', authMiddleware, usersController.setUserPhoto);
userRouter.post('/login', usersController.login);
userRouter.get('/logout', authMiddleware, usersController.logout);
userRouter.get('/get-current-user', authMiddleware, usersController.getCurrentUser);
userRouter.get('/get-user/:userId', authMiddleware, usersController.getUser);
userRouter.get('/change-password', authMiddleware, usersController.changePassword);
userRouter.get('/change-username', authMiddleware, usersController.changeUsername);

module.exports = userRouter;