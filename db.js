//khai báo lowdb
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);


// Set some defaults (required if your JSON file is empty)
db.defaults({
    users: [],
    books: [],
    trans: [],
    session: [],
    transactions: []
})
.write();

module.exports = db;