var port = process.env.PORT || 3000;
//reuire dotenv
require('dotenv').config();
//khai báo Express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
//Use MongoDB
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

app.use(cookieParser(process.env.SESSION_SECRET));

//Khai báo Router
const userRoute = require('./router/user.router');
const bookRoute = require('./router/book.router');
const transRouter = require('./router/trans.router');
const authRouter = require('./router/auth.router');
const productRouter = require('./router/product.router');
const cartRouter = require('./router/cart.router');
const shopRouter = require('./router/shop.router');

//Khai bao middleware
const authMiddleware = require('./middleware/auth.middleware');
const sessionMiddleware = require('./middleware/session.middleware');

//Khai bao api
const apiTransaction = require('./api/router/trans.router');
const apiAuth = require('./api/router/auth.router');
const apiBooks = require('./api/router/book.router');
const apiUsers = require('./api/router/user.router');

//thiết lập template PUG
app.set('view engine', 'pug');
app.set('views', './view');

function middlewareCookie(req, res, next) {
    if (!req.cookies.count)
        res.cookie('count', 1);
    else {
        var num = Number(req.cookies.count);
        res.cookie('count', ++num);
    }
    console.log("Main page access times: " + req.cookies.count);
    next();
};

app.get('/', middlewareCookie, function (req, res) {
    res.render('index', {
        name: 'Accel'
    });
});

//khai báo thư mực static files 
app.use(express.static('public'));

app.use(sessionMiddleware);

//sử dụng router
app.use('/api/trans', apiTransaction);
app.use('/api/auth', apiAuth);
app.use('/api/books', apiBooks);
app.use('/api/users', apiUsers);

app.use('/auth/login', authRouter);
app.use('/users', authMiddleware.requireAuth, authMiddleware.isAdmin, userRoute);
app.use('/books', authMiddleware.requireAuth, authMiddleware.isAdmin, bookRoute);
app.use('/trans', authMiddleware.requireAuth, transRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);
app.use('/shop', shopRouter);

//notification của server
app.listen(port, function () {
    console.log('server is start on port ' + port);
});