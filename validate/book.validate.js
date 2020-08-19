module.exports.postCreate = function (req, res, next) {
    var bookErrors = [];
    if (!req.body.title)
        bookErrors.push('Title không được để trống');
    if (!req.body.description)
        bookErrors.push('Description không được để trống');
    if (bookErrors.length) {
        res.render('books/create', {
            bookErrors: bookErrors,
            values: req.body
        });
        return;
    }
    next();
}