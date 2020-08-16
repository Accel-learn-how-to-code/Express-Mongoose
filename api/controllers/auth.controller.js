//khai bao model
var Users = require('../../model/users.model');
var bcrypt = require('bcrypt');

module.exports.postLogin = async function (req, res) {
    var email = req.body.email;
    var pass = req.body.password;

    var user = await Users.findOne({
        email: email
    });

    if (!user) {
        res.json({
            success: false,
            error: 'Sai email'
        });
        return;
    }

    bcrypt.compare(pass, user.pass, function (err, result) {
        console.log(result);
        if (!result) {
            res.json({
                success: false,
                error: 'Sai password'
            });
            return;
        } else {
            //nếu pass nhập đúng
            res.json({
                success: true,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            });
            return;
        }
    });
}