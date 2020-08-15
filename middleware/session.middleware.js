const shortid = require('shortid');
var Session = require('../model/session.model');
//const db = require('../db');

module.exports = async function (req, res, next) {
    if (!req.signedCookies.sessionId) {
        var sessionId = shortid.generate()

        var newSession = new Session({
            id: sessionId,
            cart: []
        });

        await newSession.save();

        res.cookie('sessionId', sessionId, {
            signed: true
        });
    }
    next();
}