const app = require('../backend/server');

module.exports = (req, res) => {
  // Vercel strips the /api prefix when routing to api/ directory.
  // Re-add it so Express routes (mounted at /api/*) match correctly.
  if (!req.url.startsWith('/api')) {
    req.url = '/api' + req.url;
  }
  // Call Express directly - Vercel provides standard Node.js req/res objects
  return app(req, res);
};
