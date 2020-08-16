//Khai bao model
var Trans = require('../../model/trans.model');
var Users = require('../../model/users.model');
var Books = require('../../model/books.model');
const shortid = require('shortid');

//đổ dữ liệu ra từ trans/index
module.exports.index = async function (req, res) {
    var trans = await Trans.find();
    res.json(trans);
};

//post dữ liệu lên trang create 
module.exports.postCreate = async function (req, res) {
    var trans = await Trans.create(req.body);
    res.json(trans);
};

//xóa dữ liệu
module.exports.delete = async function (req, res) {
    var id = req.params.id;
    await Trans.deleteOne({
        id: id
    });
    res.json({
        success: true
    });
    res.render('trans/delete');
};

//tạo view
module.exports.view = async function (req, res) {
    var id = req.params.id;
    var trans = await Trans.findOne({
        id: id
    });
    res.json(trans);
};

//isComplete
module.exports.isCompletePost = async function (req, res) {
    var id = req.params.id;
    var trans = await Trans.findOneAndUpdate({
        id: id
    }, {
        $set: {
            isComplete: req.body.isComplete
        }
    });
    res.json(trans);
}