const passport = require('passport-restify');

const JwtStrategy = require('passport-jwt').Strategy;

const config = require('../config/config.development.js');
const User = require('../modules/user/models/user.v1.model.js');

/**
 * Cookie Extractor
 * @param {Object} req
 */
const cookieExtractor = req => {
  var token = null;

  if (req && req.cookies) {
    token = req.cookies['x-jwt'];
  }

  return token;
};

const options = {};

options.jwtFromRequest = cookieExtractor;
options.secretOrKey = config.JWT_SECRET;

passport.use(
  new JwtStrategy(options, async (jwtPayload, done) => {
    await User.findOne({ _id: jwtPayload._id }, (err, user) => {
      if (err) {
        return done(err, false);
      }

      return user ? done(null, user) : done(null, false);
    });
  })
);
