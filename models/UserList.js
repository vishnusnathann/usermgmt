const mongoose = require('mongoose');

const UserList = new mongoose.Schema({
    name: String,
    email: String,
    photo: String
});

module.exports = mongoose.model('UserList', UserList);