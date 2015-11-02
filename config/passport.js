var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var LocalAPIKeyStrategy = require('passport-localapikey').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var bcrypt = require('bcrypt');

passport.use(new LocalStrategy(
  function(email, password, done) {
    User.findOne({ email: email }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }

      bcrypt.compare(password, user.password, function(err, res) {
        if (res) {
          return done(null, user);
        }

        return done(null, false);
      });
    });
  }
));

/*passport.use(new LocalAPIKeyStrategy(
  function(apikey, done) {
    App.findOne({ apikey: apikey }, function (err, app) {
      if (err) { return done(err); }
      if (!app) { return done(null, false, { message: 'Unknown app ' + apikey }); }
      return done(null, user);
    });
  }
));*/

var opts = {};
var JWT_SECRET_KEY = process.env.COCKTAILS_JWT_SECRET;
var JWT_ISSUER = 'cocktails-api';
var JWT_AUDIENCE = 'cocktails-api';
passport.use(new JwtStrategy({
  secretOrKey: JWT_SECRET_KEY,
  issuer: JWT_ISSUER,
  audience: JWT_AUDIENCE
}, function(payload, done) {
  User.findOne({id: payload.id}, function(err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
}));

module.exports.jwtSettings = {
  secret: JWT_SECRET_KEY,
  issuer: JWT_ISSUER,
  audience: JWT_AUDIENCE
};
