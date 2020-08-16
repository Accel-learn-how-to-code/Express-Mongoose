//reuire dotenv
require('dotenv').config();
const shortid = require('shortid');
//Khai bao
var Users = require('../../model/users.model');

//trang index của users
module.exports.index = async function (req, res) {
    var users = await Users.find();

    res.json(users);
};

module.exports.postCreate = async function (req, res) {
    req.body.id = shortid.generate();
    req.body.avatar = "";
    req.body.isAdmin = false;
    req.body.wrongLoginCount = 0;
    req.body.pass = process.env.PASSWORD;
    var users = new Users(req.body);
    await users.save();
    res.json(users);
};

module.exports.view = async function (req, res) {
    var id = req.params.id;
    var user = await Users.findOne({
        id: id
    });
    res.json(user);
};

module.exports.delete = async function (req, res) {
    var id = req.params.id;
    await Users.deleteOne({
        id: id
    });

    res.json({
        success: true
    });
};

//POST dữ liệu từ form vừa nhập lên server
module.exports.postUpdate = async function (req, res) {
    var id = req.params.id;
    req.body.avatar = "";
    await Users.findOneAndUpdate({
        id: id
    }, {
        $set: {
            name: req.body.name,
            email: req.body.email,
            avatar: req.body.avatar
        }
    });

    res.json({
        success: true
    });
};