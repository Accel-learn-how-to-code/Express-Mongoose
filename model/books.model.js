var mongoose = require('mongoose');

var booksSchema = mongoose.Schema({
    title: String,
    description: String,
    id: String,
    coverUrl: String
});

var Books = mongoose.model('Books', booksSchema, 'books');

module.exports = Books