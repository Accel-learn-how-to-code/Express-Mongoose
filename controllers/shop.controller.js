//reuire dotenv
require('dotenv').config();
const shortid = require('shortid');
//khai báo cloudinary để up ảnh
var cloudinary = require('cloudinary');
//Khai bao Model
var Books = require('../model/books.model');
var Session = require('../model/session.model');
var Users = require('../model/users.model');

module.exports.index = async function (req, res) {
    var shopId = req.params.shopId;
    if(shopId !== req.signedCookies.userID){
        res.render('404');
    }
    var books = await Books.find({
        shopId: shopId
    });
    //pagination
    var page = parseInt(req.query.page) || 1;
    var perPage = 2;
    var begin = (page - 1) * perPage;
    var end = page * perPage;
    var total = Math.ceil(books.length / perPage);

    res.render('shop/index', {
        shopId: shopId,
        totalPage: total,
        books: books.slice(begin, end)
    });
};

module.exports.search = async function (req, res) {
    var shopId = req.params.shopId;
    var q = req.query.q;
    var booksList = await Books.find({
        shopId: shopId
    });
    var matchbooks = booksList.filter(function (book) {
        return book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

    res.render('shop/index', {
        shopId: shopId,
        value: req.query,
        books: matchbooks
    });
};

//đưa đến trang create để nhập dữ liệu vào form
module.exports.create = function (req, res) {
    var shopId = req.params.shopId;
    res.render('shop/create', {
        shopId: shopId
    });
};

//POST dữ liệu từ form vừa nhập lên server
module.exports.postCreate = async function (req, res) {
    var shopId = req.params.shopId;
    req.body.id = shortid.generate();
    let imgURL = await cloudinary.uploader.upload(req.file.path, result => {
        return result;
    });
    req.body.coverUrl = imgURL.url;
    req.body.shopId = shopId;
    var newBook = new Books(req.body);
    await newBook.save();
    res.redirect('/shop/' + shopId);
};

module.exports.view = async function (req, res) {
    var shopId = req.params.shopId;
    var id = req.params.id;
    var book = await Books.findOne({
        shopId: shopId,
        id: id
    });

    res.render('shop/view', {
        shopId: shopId,
        book: book
    });
};

module.exports.listBook = async function (req, res, next) {
    try {
        var shopId = req.params.shopId;
        var books = await Books.find({
            shopId: shopId
        });
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

        res.render('shop/listBook', {
            shopId: shopId,
            totalBook: count,
            totalPage: total,
            books: books.slice(begin, end)
        })
    } catch (error) {
        res.render('404');
    }
};

module.exports.delete = async function (req, res) {
    var shopId = req.params.shopId;
    var id = req.params.id;
    await Books.deleteOne({
        shopId: shopId,
        id: id
    });

    res.render('shop/delete', {
        shopId: shopId
    });
};

//đưa đến trang update để nhập dữ liệu vào form
module.exports.update = async function (req, res) {
    var shopId = req.params.shopId;
    var id = req.params.id;
    var book = await Books.findOne({
        shopId: shopId,
        id: id
    });

    res.render('shop/update', {
        shopId: shopId,
        book: book
    });
};

//POST dữ liệu từ form vừa nhập lên server
module.exports.postUpdate = async function (req, res) {
    var shopId = req.params.shopId;
    var id = req.params.id;
    let imgURL = await cloudinary.uploader.upload(req.file.path, result => {
        return result;
    });
    req.body.coverUrl = imgURL.url;
    await Books.findOneAndUpdate({
        shopId: shopId,
        id: id
    }, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            coverUrl: req.body.coverUrl
        }
    });
    res.redirect('/shop/' + shopId);
};

module.exports.createShop = async function (req, res){
    var userId = req.signedCookies.userID;
    var user = await Users.findOne({id: userId});
    if (user.isShop === true){
        res.redirect('/shop/' + userId);
        return;
    }
    res.render('shop/createShop');
}

module.exports.postCreateShop = async function (req, res){
    var userId = req.signedCookies.userID;
    req.body.isShop = true;

    Users.findOneAndUpdate({
        id: userId
    }, {
        $set:{
            isShop: req.body.isShop,
            shopName: req.body.shopName
        }
    })
    res.redirect('/shop/' + userId);
}