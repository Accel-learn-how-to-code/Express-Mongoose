//reuire dotenv
require('dotenv').config();
const shortid = require('shortid');
//Khai bao
var Users = require('../model/users.model');
//khai báo cloudinary để up ảnh
var cloudinary = require('cloudinary');

//trang index của users
module.exports.index = async function (req, res) {
    var users = await Users.find();
    //pagination
    var page = parseInt(req.query.page) || 1;
    var perPage = 2;
    var begin = (page - 1) * perPage;
    var end = page * perPage;
    var total = Math.ceil(users.length / perPage);

    res.render('users/index', {
        totalPage: total,
        users: users.slice(begin, end)
    });
};

module.exports.search = async function (req, res) {
    var q = req.query.q;
    var usersList = await Users.find();
    var matchUsers = usersList.filter(function (user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

    res.render('users/index', {
        users: matchUsers
    });
};

//đưa đến trang create để nhập dữ liệu vào form
module.exports.create = function (req, res) {
    res.render('users/create')
};

module.exports.postCreate = async function (req, res) {
    req.body.id = shortid.generate();
    //req.body.avatar = req.file.path.split('\\').slice(1).join('/'); 
    let imgURL = await cloudinary.uploader.upload(req.file.path, result => {
        return result;
    });
    req.body.avatar = imgURL.url;
    req.body.isAdmin = false;
    req.body.wrongLoginCount = 0;
    req.body.pass = process.env.PASSWORD;
    var users = new Users(req.body);
    await users.save();
    res.redirect('/users');
};

module.exports.view = async function (req, res) {
    var id = req.params.id;
    var user = await Users.findOne({
        id: id
    });

    res.render('users/view', {
        userX: user
    });
};

module.exports.delete = async function (req, res) {
    var id = req.params.id;
    await Users.deleteOne({
        id: id
    });

    res.render('users/delete');
};

//đưa đến trang update để nhập dữ liệu vào form
module.exports.update = async function (req, res) {
    var id = req.params.id;
    var user = await Users.findOne({
        id: id
    });
    res.render('users/update', {
        userX: user
    });
};

//POST dữ liệu từ form vừa nhập lên server
module.exports.postUpdate = async function (req, res) {
    var id = req.params.id;
    //req.body.avatar = req.file.path.split('\\').slice(1).join('/');
    let imgURL = await cloudinary.uploader.upload(req.file.path, result => {
        return result;
    });
    req.body.avatar = imgURL.url;
    await Users.findOneAndUpdate({
        id: id
    }, {
        $set: {
            name: req.body.name,
            email: req.body.email,
            avatar: req.body.avatar
        }
    });

    res.redirect('/users');
};