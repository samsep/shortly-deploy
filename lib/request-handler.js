var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var util = require('../lib/utility');

var db = require('../app/config');
var User = require('../app/models/user');
var Link = require('../app/models/link');
var Users = require('../app/collections/users');
var Links = require('../app/collections/links');
var Promise = require('bluebird');


exports.renderIndex = function(req, res) {
  res.render('index');
};

exports.signupUserForm = function(req, res) {
  res.render('signup');
};

exports.loginUserForm = function(req, res) {
  res.render('login');
};

exports.logoutUser = function(req, res) {
  req.session.destroy(function(){
    res.redirect('/login');
  });
};

exports.fetchLinks = function(req, res) {
  Links.reset().fetch().then(function(links) {
    res.send(200, links.models);
  })
};

exports.saveLink = function(req, res) {
  var uri = req.body.url;

  if (!util.isValidUrl(uri)) {
    console.log('Not a valid url: ', uri);
    return res.send(404);
  }

  Link.findOne({ url: uri }).exec(function(err, found){
    if (found) {
      res.send(200, found.attributes);
    } else {
      util.getUrlTitle(uri, function(err, title) {
        if (err) {
          console.log('Error reading URL heading: ', err);
          return res.send(404);
        }
      });
    }

    var link = Link({
      url: uri,
      title: title,
      base_url: req.headers.origin
    });

    link.save().then(function(err, newLink) {
      if (err) {
        res.send(500, err);
      } else {
        Links.add(newLink);
        res.send(200, newLink);
      }
    });
  });
};

exports.loginUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({username:username}).exec(function(error, found){
    if (!found) {
      res.redirect('/login');
    } else {
      user.compare(password, function(err, match){
        if (match) {
          utils.createSession(req, res, user);
        } else {
          res.redirect('/login');
        }
      })
    }
  });
};
    // } else{
    //   bcrypt.hash(password, null, null, function(err, hash) {
    //     user.set('password', hash);
    //   });

exports.signupUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username }).exec(function(error, found){
    if (!found) {
      var newUser = new User({
        username: username,
        password: password
      });

      newUser.save(err, function(err, newUser){
        if (err) {
          res.send(500, err);
        } else {
          util.createSession(req, res, username);
        }
      });
    } else {
      console.log('Account already exists');
      res.redirect('/signup');
    }
  });
};

exports.navToLink = function(req, res) {
  Link.findOne({ code: req.params[0] }).exec(function(err, link){
    if (!link) {
      res.redirect('/');
    } else {
      link.visits++;
      link.save(function(err, link){
        res.redirect(link.url);
      })
    }
  });
};
