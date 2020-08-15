var mongoose = require('mongoose');

var sessionSchema = mongoose.Schema({
    id: String,
    cart: [{
        bookId: String,
        quantity: Number
    }]
}, {
    minimize: false
});

var Session = mongoose.model('Session', sessionSchema, 'session');

module.exports = Session