module.exports = (req, res) => {
  res.json({
    handler: '[...path].js catch-all',
    url: req.url,
    method: req.method,
    query: req.query
  });
};
