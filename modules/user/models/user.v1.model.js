const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const config = require(`../../../config/config.${process.env.NODE_ENV}.js`);

const UserSchema = new Schema(
  {
    bio: String,
    email: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      index: true,
      unique: true,
    },
    image: {
      data: String,
      filename: String,
    },
    password: String,
    salt: String,
    username: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
      index: true,
      unique: true,
    },
  },
  { timestamps: true }
);

/**
 * Generate JWT
 * @param {Object} User
 * @return {String}
 */
UserSchema.methods.generateJWT = function(User) {
  return jwt.sign({ _id: User._id }, config.JWT_SECRET, { expiresIn: '1d' });
};

/**
 * Set password
 * @param {String} password
 */
UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');

  this.password = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex');
};

/**
 * To auth JSON
 * @return {Object}
 */
UserSchema.methods.toAuthJSON = function() {
  if (this === null) return null;

  return {
    bio: this.bio,
    email: this.email,
    image: this.image,
    token: this.generateJWT(),
    username: this.username,
  };
};

/**
 * To response JSON
 * @return {Object}
 */
UserSchema.methods.toResponseJSON = function() {
  return {
    bio: this.bio,
    createdAt: this.createdAt,
    email: this.email,
    id: this._id,
    image: this.image,
    updatedAt: this.updatedAt,
    username: this.username,
  };
};

/**
 * Valid password
 * @param {String} password
 * @return {String}
 */
UserSchema.methods.validPassword = function(password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex');

  return this.password === hash;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
