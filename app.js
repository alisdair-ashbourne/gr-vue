'use strict';

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

const mongoose = require('mongoose');
const passport = require('passport-restify');
const restify = require('restify');
const CookieParser = require('restify-cookies');
const corsMiddleware = require('restify-cors-middleware');

const config = require(`./config/config.${process.env.NODE_ENV}.js`);

require('./strategies/jwt.js');

const cors = corsMiddleware({
  allowHeaders: ['x-jwt'],
  credentials: true,
  origins: ['http://localhost:8000'],
});

const app = restify.createServer({
  acceptable: config.ACCEPTABLE,
  name: config.SERVER_NAME,
  version: config.VERSION,
});

app.pre(cors.preflight);
app.use(cors.actual);

app.use(CookieParser.parse);

app.use(passport.initialize());

app.use(restify.plugins.acceptParser(app.acceptable));
app.use(restify.plugins.bodyParser());
app.use(restify.plugins.queryParser());

app.listen(config.PORT, () => {
  console.log(`\n------------------------------`);
  console.log(`\t Backend App `);
  console.log(`------------------------------`);
  console.log(`Listening on port: ${config.PORT}`);
  console.log(`Server name: ${config.SERVER_NAME}`);
  console.log(`Environment: ${config.ENV}`);
  console.log(`Path: ${config.PATH}\n`);

  mongoose.set('useFindAndModify', false);
  mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true });
});

const db = mongoose.connection;

db.on('error', err => console.error(err));
db.once('open', () => {
  require('./routes/routes')(app);
});
