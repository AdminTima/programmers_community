const roomService = require('../service/room-service');

class RoomController {
    async createRoom(req, res) {
        const {name, description, topicId} = req.body;
        const userId = req.user.id;
        console.log(userId);
        try {
            const newRoom = await roomService.createRoom(name, userId, topicId, description);
            return res.json(newRoom);
        } catch (err) {
            console.log(err);
            return res.json('Error occured');
        }
    }

    async getAllRooms(req, res) {
        try {
            const allRooms = await roomService.getRooms();
            return res.json(allRooms);
        } catch (err) {
            console.log(err);
            return res.status(400).json('An error occured');
        }
    }

    async getRoomParticipants(req, res) {
        try {
            const { roomId } = req.params;
            const participants = await roomService.getRoomParticipants(roomId);
            return res.json(participants);
        } catch (err) {
            console.log(err);
            return res.status(400).json('get part error');
        }
    }

    async getCurrentUserRooms(req, res) {
        try {
            const userId = req.user.id;
            console.log(userId);
            const userRooms = await roomService.getUserRooms(userId);
            return res.json(userRooms);
        } catch (err) {
            console.log(err);
            return res.status(400).json('get all user rooms error');
        }
    }

    async getUserRooms(req, res) {
        try {
            const { userId } = req.params;
            console.log(userId);
            const userRooms = await roomService.getUserRooms(userId);
            return res.json(userRooms);
        } catch (err) {
            console.log(err);
            return res.status(400).json('get all user rooms error');
        }
    }
}

module.exports = new RoomController();