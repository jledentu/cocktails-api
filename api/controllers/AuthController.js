const passport = require('passport');
const jwt = require('jsonwebtoken');

/**
 * AuthController
 *
 * @description :: Server-side logic for managing authorization
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  login: function (req, res) {
    passport.authenticate('local', (err, user) => {
      if ((err) || (!user)) {
        return res.forbidden();
      }

      return res.json({
        token: jwt.sign(user.toJSON(), sails.config.jwtSettings.secret, {
          issuer: sails.config.jwtSettings.issuer,
          audience: sails.config.jwtSettings.audience
        })
      });
    })(req, res);
  }
};
