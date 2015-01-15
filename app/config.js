var path = require('path');
var mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/shortlyDB');
mongoose.connect('mongodb://localhost/shortlyDB');
var db = mongoose.connection;

db.once('open', function (callback) {
  var Url = mongoose.Schema({
    'url': String,
    'base_url': String,
    'code': String,
    'title': String,
    'visits': Number
  });

  var User = mongoose.Schema({
    'username': String,
    'password': String
  });

  // var User = mongoose.model('User', users);
  // var Url = mongoose.model('Url', urls);
  var user = new User({username:'devin', password:'devin'});
});

module.exports = db;

// var db = Bookshelf.initialize({
//   client: 'sqlite3',
//   connection: {
//     host: '127.0.0.1',
//     user: 'your_database_user',
//     password: 'password',
//     database: 'shortlydb',
//     charset: 'utf8',
//     filename: path.join(__dirname, '../db/shortly.sqlite')
//   }
// });

// db.knex.schema.hasTable('urls').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('urls', function (link) {
//       link.increments('id').primary();
//       link.string('url', 255);
//       link.string('base_url', 255);
//       link.string('code', 100);
//       link.string('title', 255);
//       link.integer('visits');
//       link.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username', 100).unique();
//       user.string('password', 100);
//       user.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });
