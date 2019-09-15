const getExample = (req, res, next) => {
  res.send({ status: 'success' });

  return next();
};

module.exports = {
  get: getExample,
};
