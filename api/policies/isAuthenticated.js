var passport = require('passport');

module.exports = function(req, res, next) {
  return passport.authenticate('jwt', {session: false})(req, res, next);
};
