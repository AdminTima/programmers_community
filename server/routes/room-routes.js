const { Router } = require('express');
const roomController = require('../controllers/room-controller');

const roomRouter = Router();

roomRouter.post('/create',  roomController.createRoom);
roomRouter.get('/all',  roomController.getAllRooms);
roomRouter.get('/participants/:roomId',  roomController.getRoomParticipants);
roomRouter.get('/current-user-rooms/:userId', roomController.getUserRooms);
roomRouter.get('/user-rooms',  roomController.getCurrentUserRooms);


module.exports = roomRouter;