const mongoose = require('mongoose');
const { Schema } = mongoose;

const TokenSchema = new Schema({
    refreshToken: {type: String},
    user_id: {type: Schema.Types.ObjectId, ref: 'Users'},
});

module.exports = mongoose.model('Tokens', TokenSchema);