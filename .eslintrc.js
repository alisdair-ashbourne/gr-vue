module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['google', 'plugin:prettier/recommended'],
  globals: {
    GrAppGlobals: 'writable',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['prettier'],
  rules: {
    'require-jsdoc': 0,
    semi: 1,
  },
};
