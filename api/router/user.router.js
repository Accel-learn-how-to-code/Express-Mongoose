//khai báo Router 
var express = require('express');
var router = express.Router();

//lấy các function từ user.controller
var controller = require('../controllers/user.controller');

//sử dụng function
router.get('/', controller.index);

router.get('/:id', controller.view);

router.get('/:id/delete', controller.delete);

router.post('/', controller.postCreate);

router.patch('/:id/update', controller.postUpdate);

module.exports = router;