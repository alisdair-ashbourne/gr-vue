const errors = require('restify-errors');

const User = require('../../user/models/user.v1.model.js');

/**
 * Authorize
 * @param {Object} req
 * @param {Object} res
 * @callback next
 */
const authorize = async (req, res, next) => {
  res.send({ authorized: true, success: 'User is authorized.' });

  return next();
};

/**
 * Deregister
 * @param {Object} req
 * @param {Object} res
 * @callback next
 */
const deregister = async (req, res, next) => {
  try {
    res.clearCookie('x-jwt', { path: '/' });

    res.send({ success: 'Token destroyed.' });

    return next();
  } catch (err) {
    return next(new errors.InternalError('Could not generate expired token.'));
  }
};

/**
 * Register
 * @param {Object} req
 * @param {Object} res
 * @callback next
 */
const register = async (req, res, next) => {
  let user = await User.findOne({
    username: req.body.username,
  });

  if (!user) {
    return next(new errors.NotFoundError('No user found.'));
  }

  if (!user.validPassword(req.body.password)) {
    return next(new errors.InvalidCredentialsError('Invalid Credentials.'));
  }

  try {
    const token = user.generateJWT(user);

    res.setCookie('x-jwt', token, {
      httpOnly: true,
      path: '/',
      secure: req.connection.encrypted ? true : false,
    });

    res.send({ success: 'Token created.', user: user.toResponseJSON() });

    return next();
  } catch (err) {
    return next(new errors.InternalError('Could not generate token.'));
  }
};

module.exports = {
  authorize: authorize,
  deregister: deregister,
  register: register,
};
