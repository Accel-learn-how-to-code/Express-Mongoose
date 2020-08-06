//lấy khai báo lowdb từ db.js
var db = require('../db');

module.exports.postCreate = function (req, res, next) {
    //validate
    var errors = [];
    var email = req.body.email;
    var user = db.get('users').find({
        email: email
    }).value();
    if (!req.body.name)
        errors.push('Tên không được để trống');

    if (req.body.name.length > 30)
        errors.push('Tên không được quá 30 ký tự');

    if (user) {
        errors.push('Email đã được sử dụng!');
    }

    if (errors.length) {
        res.render('users/create', {
            errors: errors,
            value: req.body
        });
        return;
    }

    next();
}

module.exports.postUpdate = function (req, res, next) {
    //validate
    var errors = [];
    var email = req.body.email;
    var user = db.get('users').find({
        email: email
    }).value();
    if (!req.body.name)
        errors.push('Tên không được để trống');

    if (req.body.name.length > 30)
        errors.push('Tên không được quá 30 ký tự');

    if (user && (user.email !== email)) {
        errors.push('Email đã được sử dụng!');
    }

    if (errors.length) {
        res.render('users/create', {
            errors: errors,
            value: req.body
        });
        return;
    }

    next();
}