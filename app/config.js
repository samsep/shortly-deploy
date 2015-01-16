var path = require('path');
var mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/shortlyDB');
mongoose.connect('mongodb://localhost/shortlyDB');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('db is open');
});

module.exports = db;
