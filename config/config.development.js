module.exports = {
  APP_NAME: process.env.APP_NAME || 'guest-registration-backend',
  ACCEPTABLE: ['application/json'],
  AUDIENCE: process.env.AUDIENCE || '127.0.0.1',
  ENV: process.env.NODE_ENV || 'development',
  JWT_SECRET: process.env.JWT_SECRET || 'secret1',
  MONGODB_URI:
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/gr-development',
  PATH: process.env.BASE_PATH || '/api/v1/',
  PORT: process.env.PORT || 3000,
  SERVER_NAME: process.env.SERVER_NAME || 'localhost',
  URL: process.env.BASE_URL || 'http://127.0.0.1:3000',
  VERSION: process.env.VERSION || '1.0.0',
};
