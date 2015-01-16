var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {
      type: String,
      index: { unique: true }
    },
    password: String
  });

var User = mongoose.model('User', userSchema);

User.prototype.compare = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, thispassword, function(err, isMatch) {
    if (err) {
      console.log('error', err);
    } else {
      callback(isMatch);
    }
  });
};

userSchema.pre('save', function(next){
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
    });
})

module.exports = User;
