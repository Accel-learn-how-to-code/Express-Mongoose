//khai báo Router 
var express = require('express');
var router = express.Router();

//Khai báo Multer dùng để upload file img
var multer = require('multer');
var upload = multer({
    dest: './public/uploads/'
});

//lấy các function từ user.controller
var controller = require('../controllers/user.controller');
var validate = require('../validate/user.validate');
var middleware = require('../middleware/auth.middleware');

//sử dụng function
router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.view);

router.get('/:id/delete', controller.delete);

router.post('/create', upload.single('avatar'), validate.postCreate, controller.postCreate);

router.get('/:id/update', controller.update);

router.post('/:id/update', upload.single('avatar'), validate.postUpdate, controller.postUpdate);

module.exports = router;