var mongoose = require('mongoose');

var cartSchema = mongoose.Schema({
    id: String,
    cart: [{
        bookId: String,
        quantity: Number
    }]
});

var Cart = mongoose.model('Cart', cartSchema, 'transactions');

module.exports = Cart