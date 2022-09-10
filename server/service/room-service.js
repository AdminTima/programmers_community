const Room = require('../models/Room');
const RoomParticipats = require('../models/RoomParticipants');

class RoomService {
    async createRoom(roomName, userId, topicId, description) {
        try {
            const room = await Room.findOne({name: roomName});
            if(room) {
                throw new Error('Sorry room with this name already exists.');
            }
            const newRoom = await Room.create(
                {name: roomName, creator: userId, topic: topicId, description }
            );
            return newRoom;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    }

    async getRooms() {
        try {
            return await Room.find({}).populate('creator');
        } catch (err) {
            console.log(err);
        }
    }

    async addNewRoomParticipant(userId, roomId) {
        try {
            const candidate = await RoomParticipats.findOne({userId, roomId});
            if(!candidate) {
                return await RoomParticipats.create({userId, roomId});
            }
        } catch (err) {
            console.log(err);
        }
    }

    async getRoomParticipants(roomId) {
        try {
            return await RoomParticipats.find({roomId}).populate('userId');
        } catch (err) {
            console.log(err);
        }
    }

    async getUserRooms(creator) {
        try {
            return await Room.find({creator});
        } catch (err) {
            console.log(err);
        }
    }


}

module.exports = new RoomService();