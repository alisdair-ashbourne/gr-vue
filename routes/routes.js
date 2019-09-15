module.exports = app => {
  require('../modules/authenticate/routes/authenticate.v1.routes.js')(app);
  require('../modules/example/routes/example.v1.routes.js')(app);
  require('../modules/user/routes/user.v1.routes.js')(app);
};
