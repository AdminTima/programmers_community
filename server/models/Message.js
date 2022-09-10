const { Schema, model } = require('mongoose');


const MessageSchema = new Schema({
        userId: { type: Schema.Types.ObjectId, ref: 'Users' },
        roomId: { type: Schema.Types.ObjectId, ref: 'Room' },
        messageText: { type: String, required: true },
        file: { type: String },
    },
    { timestamps: true }
);

module.exports = model('Message', MessageSchema);