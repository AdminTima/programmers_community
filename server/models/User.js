const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    userImage: {type: String},
    password: {type: String, required: true},
    isStaff: {type: Boolean, default: false},

},
    {timestamps: true}
);

module.exports = mongoose.model('Users', UserSchema);