//lấy khai báo db từ db.js
const db = require('../db');
//Khai bao model
var Trans = require('../model/trans.model');
var Users = require('../model/users.model');
var Books = require('../model/books.model');
const shortid = require('shortid');

//đổ dữ liệu ra từ trans/index
module.exports.index = async function (req, res) {
    var trans = await Trans.find();
    //pagination
    var page = parseInt(req.query.page) || 1;
    var perPage = 2;
    var begin = (page - 1) * perPage;
    var end = page * perPage;
    var total = Math.ceil(trans.length / perPage);

    res.render('trans/index', {
        totalPage: total,
        trans: trans.slice(begin, end)
    });
};

//đưa tới trang create
module.exports.create = async function (req, res) {
    var users = await Users.find();
    var books = await Books.find();
    res.render('trans/create', {
        users: users,
        books: books
    });
};

//post dữ liệu lên trang create 
module.exports.postCreate = async function (req, res) {
    req.body.id = shortid.generate();
    req.body.userId = (await Users.findOne({
        name: req.body.user
    })).id;
    req.body.bookId = (await Books.findOne({
        title: req.body.book
    })).id;
    req.body.isComplete = false;
    var newTrans = new Trans(req.body);
    await newTrans.save();
    res.redirect('/trans');
};

//xóa dữ liệu
module.exports.delete = async function (req, res) {
    var id = req.params.id;
    await Trans.deleteOne({
        id: id
    });
    res.render('trans/delete');
};

//tạo view
module.exports.view = async function (req, res) {
    var id = req.params.id;
    var trans = await Trans.findOne({
        id: id
    });
    res.render('trans/view', {
        trans: trans
    });
};

//isComplete
module.exports.isComplete = async function (req, res) {
    var id = req.params.id;
    //validate
    var trans = await Trans.findOne({
        id: id
    });
    var error;
    if (!trans) {
        error = 'ID không tồn tại';
        res.render('trans/complete', {
            error: error
        });
        return;
    }
    res.render('trans/complete', {
        trans: trans
    });
}

module.exports.isCompletePost = async function (req, res) {
    var id = req.params.id;
    await Trans.findOneAndUpdate({
        id: id
    }, {
        $set: {
            isComplete: req.body.isComplete
        }
    });
    res.redirect('/trans');
}