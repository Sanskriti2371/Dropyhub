const app = require('../backend/server');

module.exports = (req, res) => {
  // If Vercel rewrote the URL to /api/index.js, restore from x-matched-path header if available
  if (req.url.startsWith('/api/index.js') && req.headers['x-matched-path']) {
    req.url = req.headers['x-matched-path'];
  }
  return app(req, res);
};
