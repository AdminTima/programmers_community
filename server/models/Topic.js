const { Schema, model } = require('mongoose');


const TopicSchema = new Schema({
        name: { type: String, unique: true, required: true },
    },
);

module.exports = model('Topic', TopicSchema);