/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
    email: {
      type: 'email',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      minLength: 8,
      required: true,
      columnName: 'encrypted_password'
    },
    salt: {
      type: 'string'
    },
    // override default toJSON
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      delete obj.salt;
      return obj;
    }
  },

  beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      user.salt = salt;
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          console.log(err);
          cb(err);
        } else {
          user.password = hash;
          console.log(hash);
          cb();
        }
      });
    });
  },

  beforeUpdate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      user.salt = salt;
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          console.log(err);
          cb(err);
        } else {
          user.password = hash;
          console.log(hash);
          cb();
        }
      });
    });
  }
};
