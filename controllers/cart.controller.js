//lấy khai báo lowdb từ db.js
var db = require('../db');
var Session = require('../model/session.model');
var Books = require('../model/books.model');
var Cart = require('../model/cart.model');

module.exports.index = async function (req, res) {
    var sessionId = req.signedCookies.sessionId;
    //count product in cart
    if (!sessionId) {
        res.redirect('/product');
        return;
    };

    var session = await Session.findOne({
        id: sessionId
    });
    var count = 0;
    var data = session.cart;
    for (let key of data) {
        count += key.quantity;
    }

    //get Array of Book Name
    var books = [];
    for (let key of data) {
        var quantity = key.quantity;
        var selectBook = await Books.findOne({
            id: key.bookId
        });
        var title = selectBook.title;
        var pic = selectBook.coverUrl;
        var book = {
            id: key.bookId,
            title: title,
            quantity: quantity,
            coverUrl: pic
        }
        books.push(book);
    }
    res.render('cart/index', {
        totalBook: count,
        books: books
    });
}

module.exports.addToCart = async function (req, res) {
    var bookId = req.params.bookId;
    var sessionId = req.signedCookies.sessionId;

    if (!sessionId) {
        res.redirect('/product');
        return;
    };
    var session = await Session.findOne({
        id: sessionId
    });
    if (bookId) {
        var book = session.cart.find(
            cartItem => cartItem.bookId === bookId
        );
        if (book) {
            book.quantity += 1;
            session.save();
        } else {
            await Session.findOneAndUpdate({
                id: sessionId
            }, {
                $push: {
                    cart: {
                        bookId: bookId,
                        quantity: 1
                    }
                }
            });
        }
    }

    backURL = req.header('Referer') || '/';
    res.redirect(backURL);
}

module.exports.deleteItem = async function (req, res) {
    var bookId = req.params.bookId;
    var sessionId = req.signedCookies.sessionId;

    if (!sessionId) {
        res.redirect('/product');
        return;
    }
    var session = await Session.findOne({
        id: sessionId
    });

    var book = session.cart;
    book = book.filter(function (obj) {
        return obj.bookId !== bookId;
    });
    await Session.findOneAndUpdate({
        id: sessionId
    }, {
        $set: {
            cart: book
        }
    });
    res.redirect('/cart');
}

module.exports.checkout = async function (req, res) {
    var sessionId = req.signedCookies.sessionId;
    var userId = req.signedCookies.userID;

    var session = await Session.findOne({
        id: sessionId
    });
    var data = session.cart;

    var userCart = {
        id: userId,
        cart: data
    };

    var newCart = new Cart(userCart);
    await newCart.save();

    await Session.findOneAndUpdate({
        id: sessionId
    }, {
        $set: {
            cart: []
        }
    });

    res.render('cart/delete');
}