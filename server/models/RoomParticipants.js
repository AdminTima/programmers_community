const { Schema, model } = require('mongoose');


const RoomParticipantsSchema = new Schema({
   roomId: { type: Schema.Types.ObjectId, ref: 'Room' },
   userId: { type: Schema.Types.ObjectId, ref: 'Users' },
});

module.exports = model('RoomParticipants',RoomParticipantsSchema)