//reuire dotenv
require('dotenv').config();
const shortid = require('shortid');

//Khai bao Model
var Books = require('../../model/books.model');

//trang index của books
module.exports.index = async function (req, res) {
    var books = await Books.find();

    res.json(books);
};

//POST dữ liệu từ form vừa nhập lên server
module.exports.postCreate = async function (req, res) {
    req.body.id = shortid.generate();

    req.body.coverUrl = "";
    var newBook = new Books(req.body);
    var book = await newBook.save();
    res.json(book);
};

module.exports.view = async function (req, res) {
    var id = req.params.id;
    var book = await Books.findOne({
        id: id
    });

    res.json(book);
};

module.exports.delete = async function (req, res) {
    var id = req.params.id;
    await Books.deleteOne({
        id: id
    });

    res.json({
        success: true
    });
};

//POST dữ liệu từ form vừa nhập lên server
module.exports.postUpdate = async function (req, res) {
    var id = req.params.id;
    req.body.coverUrl = "";
    var book = await Books.findOneAndUpdate({
        id: id
    }, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            coverUrl: req.body.coverUrl
        }
    });
    res.json({
        success: true
    });
};