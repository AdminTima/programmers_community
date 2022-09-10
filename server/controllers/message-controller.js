const messageService = require('../service/message-service');
const events = require('events');

const emmiter = new events.EventEmitter();

class MessageController {
    async newMessage(req, res) {
        try {
            const userId = req.user.id;
            const {messageText, roomId} = req.body;
            const newMessage = await messageService.newMessage(userId, roomId, messageText);
            emmiter.emit('newMessage', messageText);
            //return res.json(newMessage);
        } catch (err) {
            console.log(err);
            return res.status(400).json('Message creation error');
        }
    }

    async getRoomMessages(req, res) {
        try {
            const { roomId } = req.params;
            const messages = await messageService.getRoomMessages(roomId);
            return res.json(messages);
        } catch (err) {
            console.log(err);
            return res.status(400).json('Get all msg for room error');
        }
    }
}

module.exports = new MessageController();