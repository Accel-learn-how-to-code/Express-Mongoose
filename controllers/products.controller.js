//lấy khai báo lowdb từ db.js
//var db = require('../db');

var Books = require('../model/books.model');
var Session = require('../model/session.model');

module.exports.index = async function (req, res) {
    try {
        var books = await Books.find();
        var sessionId = req.signedCookies.sessionId;

        //pagination
        var page = parseInt(req.query.page) || 1;
        var perPage = 4;
        var begin = (page - 1) * perPage;
        var end = page * perPage;
        var total = Math.ceil(books.length / perPage);

        //count product in cart
        if (sessionId) {
            var session = await Session.findOne({
                id: sessionId
            });
            var count = 0;
            for (let book of session.cart) {
                count += book.quantity;
            }
        }

        res.render('products/index', {
            totalBook: count,
            totalPage: total,
            books: books.slice(begin, end)
        })
    } catch (error) {
        res.render('404');
    }
}