const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(
  (email, password, done) => {
    sails.models.User.findOne({ email: email }, (err, user) => {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }

      bcrypt.compare(password, user.password, (err, res) => {
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

let JWT_SECRET_KEY = process.env.COCKTAILS_JWT_SECRET || 'test';
let JWT_ISSUER = 'cocktails-api';
let JWT_AUDIENCE = 'cocktails-api';
passport.use(new JwtStrategy({
  secretOrKey: JWT_SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  issuer: JWT_ISSUER,
  audience: JWT_AUDIENCE
}, (payload, done) => {
  sails.models.User.findOne({id: payload.id}, (err, user) => {
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
