const { Schema, model } = require('mongoose');


const RoomSchema = new Schema({
    creator: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    topic: { type: Schema.Types.ObjectId, ref: 'Topic', required: true },
    name: { type: String, unique: true, required: true },
    description: { type: String },
    participants: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
},
    { timestamps: true }
);

module.exports = model('Room', RoomSchema);