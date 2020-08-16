//khai báo Router
const express = require('express');
const router = express.Router();
module.exports = router;

//Lấy function từ trans.controller
const controller = require('../controllers/trans.controller');

//Hàm thực thi

router.get('/', controller.index);

//router.get('/create', controller.create);
router.post('/create', controller.postCreate);

router.get('/:id/delete', controller.delete);

router.get('/:id', controller.view);

router.patch('/:id/complete', controller.isCompletePost);

