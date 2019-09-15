const passport = require('passport-restify');

const config = require(`../../../config/config.${process.env.NODE_ENV}.js`);

const authenticateController = require('../controllers/authenticate.v1.controller.js');

module.exports = app => {
  const routePath = `${config.PATH}`;

  app.get(
    { path: `${routePath}authorize`, version: '1.0.0' },
    passport.authenticate('jwt', { session: false }),
    authenticateController.authorize
  );

  app.post(
    { path: `${routePath}login`, version: '1.0.0' },
    authenticateController.register
  );
  app.post(
    { path: `${routePath}logout`, version: '1.0.0' },
    authenticateController.deregister
  );
};
