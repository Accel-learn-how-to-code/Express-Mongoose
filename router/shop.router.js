//khai báo Router 
var express = require('express');
var router = express.Router();

//Khai báo Multer dùng để upload file img
var multer = require('multer');
var upload = multer({
    dest: './public/uploads/'
});

//lấy các function từ book.controller
var controller = require('../controllers/shop.controller');
var validate = require('../validate/book.validate');
var middleware = require('../middleware/auth.middleware');

//sử dụng function
router.get('/:shopId', middleware.requireAuth, controller.index);

router.get('/:shopId/search', middleware.requireAuth, controller.search);

router.get('/:shopId/create', middleware.requireAuth, controller.create);

router.post('/:shopId/create', middleware.requireAuth, middleware.requireAuth, upload.single('coverUrl'), controller.postCreate);

router.get('/:shopId/book', controller.listBook);

router.get('/:shopId/book/:id', middleware.requireAuth, controller.view);

router.get('/:shopId/book/:id/delete', middleware.requireAuth, controller.delete);

router.get('/:shopId/book/:id/update', middleware.requireAuth, controller.update);

router.patch('/:shopId/book/:id/update', middleware.requireAuth, upload.single('coverUrl'), controller.postUpdate);

router.get('/create/createShop', middleware.requireAuth, controller.createShop);

router.post('/create/createShop', middleware.requireAuth, controller.postCreateShop);


module.exports = router;