var mongoose = require('mongoose');

var booksSchema = mongoose.Schema({
    title: String,
    description: String,
    id: String,
    coverUrl: String,
    shopId: String
});

var Books = mongoose.model('Books', booksSchema, 'books');

module.exports = Books