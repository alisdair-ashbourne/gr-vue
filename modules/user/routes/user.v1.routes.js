const passport = require('passport-restify');

const config = require(`../../../config/config.${process.env.NODE_ENV}.js`);
const userController = require('../controllers/user.v1.controller.js');

module.exports = app => {
  const routePath = `${config.PATH}user`;

  app.del(
    { path: `${routePath}/:id`, version: '1.0.0' },
    passport.authenticate('jwt', { session: false }),
    userController.delete
  );

  app.get(
    { path: `${routePath}`, version: '1.0.0' },
    passport.authenticate('jwt', { session: false }),
    userController.getAll
  );

  app.get(
    { path: `${routePath}/:id`, version: '1.0.0' },
    passport.authenticate('jwt', { session: false }),
    userController.get
  );

  app.patch(
    { path: `${routePath}/:id`, version: '1.0.0' },
    passport.authenticate('jwt', { session: false }),
    userController.update
  );

  app.post({ path: routePath, version: '1.0.0' }, userController.create);
};
