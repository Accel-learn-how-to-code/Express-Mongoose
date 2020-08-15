var mongoose = require('mongoose');

var tranSchema = mongoose.Schema({
    user: String,
    book: String,
    id: String,
    userId: String,
    bookId: String,
    isComplete: Boolean
});

var Trans = mongoose.model('Trans', tranSchema, 'trans')

module.exports = Trans;

