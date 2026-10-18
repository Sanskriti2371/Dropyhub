module.exports = (req, res) => {
  res.json({
    url: req.url,
    method: req.method,
    query: req.query,
    originalUrl: req.originalUrl || 'N/A'
  });
};
