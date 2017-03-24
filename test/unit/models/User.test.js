const bcrypt = require('bcrypt');
const User = require('../../api/models/user');

describe('UserModel', function() {

  const EMAIL = 'myemail@cocktails.test';
  const PASSWORD = 'mypassword';

  describe('#create()', function() {
    it('should create a new user', function(done) {
      User.create({
        email: EMAIL,
        password: PASSWORD
      }).then(function(user) {
          user.email.should.be.eql(EMAIL);

          bcrypt.hash(PASSWORD, user.salt, function(err, hash) {
            if (err) {
              done();
            } else {
              user.password.should.be.eql(hash);
              done();
            }
          });
        })
        .catch(done);
    });
  });

  describe('#findOne()', function() {
    it('should return a user', function(done) {
      User.findOne({email: EMAIL})
        .then(function(user) {
          user.email.should.be.eql(EMAIL);
          bcrypt.hash(PASSWORD, user.salt, function(err, hash) {
            if (err) {
              done();
            } else {
              user.password.should.be.eql(hash);
              done();
            }
          });
        })
        .catch(done);
    });
  });

  describe('#destroy()', function() {
    it('should destroy a user object', function(done) {
      User.destroy({email: EMAIL})
        .then(function() {
          done();
        })
        .catch(done);
    });
  });
});
