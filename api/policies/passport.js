var passport = require('passport');

/**
 * Passport Middleware
 *
 * Policy for Sails that initializes Passport.js.
 *
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */
module.exports = function(req, res, next) {
  // Initialize Passport
  passport.initialize()(req, res, function () {
    next();
  });
};
