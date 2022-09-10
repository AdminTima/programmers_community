const Room = require('../models/Room');
const Message = require('../models/Message');
const roomService = require('./room-service');
const {v4: uuidv4} = require('uuid');
const path = require('path');
const fs = require('fs');

class MessageService {
    async newMessage(userId, roomId, messageText, messageFile) {
        try {
            const room = await Room.findById(roomId);
            let dbPath = '';
            if(room) {
                if(messageFile) {
                    dbPath = `${uuidv4()}.jpg`;
                    const filePath = path.join(
                        __dirname,
                        '/..',
                        '/media',
                        '/message-files',
                        '/message-images',
                        dbPath
                    );
                    await fs.writeFile(filePath, messageFile, ()=> console.log('msg file moved successfully'));
                }
                const newMessage = (await Message.create({userId, roomId: roomId, messageText, file: dbPath})).populate('userId');
                await roomService.addNewRoomParticipant(userId, roomId);
                return newMessage;
            } else {
                throw new Error('No such room');
            }
        } catch (err) {
            console.log(err);
            throw new Error('no such room');
        }
    }

    async getRoomMessages(roomId) {
        try {
            return await Message.find({roomId}).populate('userId');
        } catch (err) {
            console.log(err)
            throw new Error('getting msgs ferrr');
        }
    }
}

module.exports = new MessageService();