const errors = require('restify-errors');

const User = require('../models/user.v1.model.js');

/**
 * Create user
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const createUser = async (req, res, next) => {
  if (!req.is('application/json')) {
    return next(new errors.InvalidContentError("Expects 'application/json'"));
  }

  const { username, email, password, bio, image } = req.body;

  try {
    const user = new User({
      bio,
      email,
      image,
      password,
      username,
    });

    user.setPassword(user.password);

    await user.save();

    res.send(user.toResponseJSON());
    res.status(201);

    next();
  } catch (err) {
    return next(new errors.InternalError(err.message));
  }
};

/**
 * Get user
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const deleteUser = async (req, res, next) => {
  const id = req.params.id || req.user.id;

  try {
    await User.findOneAndRemove({ _id: id });

    res.status(204);
    res.send({ success: 'User deleted' });

    next();
  } catch (err) {
    return next(new errors.InvalidContentError(err.message));
  }
};

/**
 * Get user
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const getUser = async (req, res, next) => {
  const id = req.params.id || req.user.id;

  try {
    const user = await User.findOne({ _id: id });

    user === null
      ? res.send({ message: 'User not found' })
      : res.send(user.toResponseJSON());

    next();
  } catch (err) {
    return next(new errors.InvalidContentError(err.message));
  }
};

/**
 * Get users
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const getUsers = async (req, res, next) => {
  try {
    const user = await User.find();

    res.send(user);

    next();
  } catch (err) {
    return next(new errors.InvalidContentError(err.message));
  }
};

/**
 * Update user
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const updateUser = async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });

    if (req.body.password) {
      user.setPassword(req.body.password);

      await user.save();
    }

    res.send(user);

    next();
  } catch (err) {
    return next(new errors.InvalidContentError(err.message));
  }
};

module.exports = {
  create: createUser,
  delete: deleteUser,
  get: getUser,
  getAll: getUsers,
  update: updateUser,
};
