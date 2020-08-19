//lấy khai báo lowdb từ db.js
var db = require('../db');

module.exports.postCreate = function (req, res, next) {
    //validate
    var usersErrors = [];
    var email = req.body.email;
    var user = db.get('users').find({
        email: email
    }).value();
    if (!req.body.name)
        usersErrors.push('Tên không được để trống');

    if (req.body.name.length > 30)
        usersErrors.push('Tên không được quá 30 ký tự');

    if (user) {
        usersErrors.push('Email đã được sử dụng!');
    }

    if (usersErrors.length) {
        res.render('users/create', {
            usersErrors: usersErrors,
            value: req.body
        });
        return;
    }

    next();
}

module.exports.postUpdate = function (req, res, next) {
    //validate
    var usersErrors = [];
    var email = req.body.email;
    var user = db.get('users').find({
        email: email
    }).value();
    if (!req.body.name)
        usersErrors.push('Tên không được để trống');

    if (req.body.name.length > 30)
        usersErrors.push('Tên không được quá 30 ký tự');

    if (user && (user.email !== email)) {
        usersErrors.push('Email đã được sử dụng!');
    }

    if (usersErrors.length) {
        res.render('users/create', {
            usersErrors: usersErrors,
            value: req.body
        });
        return;
    }

    next();
}