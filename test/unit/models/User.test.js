const bcrypt = require('bcrypt');

describe('UserModel', () => {

  let User;

  before(() => {
    User = sails.models.user;
  });

  const EMAIL = 'myemail@cocktails.test';
  const PASSWORD = 'mypassword';

  describe('#create()', () => {
    it('should create a new user', (done) => {
      User.create({
        email: EMAIL,
        password: PASSWORD
      }).then((user) => {
        user.email.should.be.eql(EMAIL);

        bcrypt.hash(PASSWORD, user.salt, (err, hash) => {
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

  describe('#findOne()', () => {
    it('should return a user', (done) => {
      User.findOne({email: EMAIL})
        .then((user) => {
          user.email.should.be.eql(EMAIL);
          bcrypt.hash(PASSWORD, user.salt, (err, hash) => {
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

  describe('#destroy()', () => {
    it('should destroy a user object', (done) => {
      User.destroy({email: EMAIL})
        .then(function() {
          done();
        })
        .catch(done);
    });
  });
});
