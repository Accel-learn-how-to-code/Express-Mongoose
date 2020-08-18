//reuire dotenv
require('dotenv').config();
const shortid = require('shortid');
//khai báo cloudinary để up ảnh
var cloudinary = require('cloudinary');
//Khai bao Model
var Books = require('../model/books.model');

//trang index của books
module.exports.index = async function (req, res) {
    var books = await Books.find();
    //pagination
    var page = parseInt(req.query.page) || 1;
    var perPage = 2;
    var begin = (page - 1) * perPage;
    var end = page * perPage;
    var total = Math.ceil(books.length / perPage);

    res.render('books/index', {
        totalPage: total,
        books: books.slice(begin, end)
    });
};

module.exports.search = async function (req, res) {
    var q = req.query.q;
    var booksList = await Books.find();
    var matchbooks = booksList.filter(function (book) {
        return book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

    res.render('books/index', {
        books: matchbooks
    });
};

//đưa đến trang create để nhập dữ liệu vào form
module.exports.create = function (req, res) {
    res.render('books/create');
};

//POST dữ liệu từ form vừa nhập lên server
module.exports.postCreate = async function (req, res) {
    req.body.id = shortid.generate();
    let imgURL = await cloudinary.uploader.upload(req.file.path, result => {
        return result;
    });
    req.body.coverUrl = imgURL.url;
    var newBook = new Books(req.body);
    await newBook.save();
    res.redirect('/books');
};

module.exports.view = async function (req, res) {
    var id = req.params.id;
    var book = await Books.findOne({
        id: id
    });

    res.render('books/view', {
        book: book
    });
};

module.exports.delete = async function (req, res) {
    var id = req.params.id;
    await Books.deleteOne({
        id: id
    });

    res.render('books/delete');
};

//đưa đến trang update để nhập dữ liệu vào form
module.exports.update = async function (req, res) {
    var id = req.params.id;
    var book = await Books.findOne({
        id: id
    });

    res.render('books/update', {
        book: book
    });
};

//POST dữ liệu từ form vừa nhập lên server
module.exports.postUpdate = async function (req, res) {
    var id = req.params.id;
    let imgURL = await cloudinary.uploader.upload(req.file.path, result => {
        return result;
    });
    req.body.coverUrl = imgURL.url;
    await Books.findOneAndUpdate({
        id: id
    }, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            coverUrl: req.body.coverUrl
        }
    });
    res.redirect('/books');
};

