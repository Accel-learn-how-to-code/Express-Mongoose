var mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
    name: String,
    id: String,
    email: String,
    pass: String,
    isAdmin: Boolean,
    wrongLoginCount: Number,
    avatar: String
});

var Users = mongoose.model('Users', usersSchema, 'users');

module.exports = Users

