//khai báo Router 
var express = require('express');
var router = express.Router();

//lấy các function từ book.controller
var controller = require('../controllers/book.controller');

//sử dụng function
router.get('/', controller.index);

router.post('/', controller.postCreate);

router.get('/:id', controller.view);

router.get('/:id/delete', controller.delete);

router.post('/:id/update', controller.postUpdate);

module.exports = router;