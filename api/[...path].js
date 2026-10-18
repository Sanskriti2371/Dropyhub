const app = require('../backend/server');
const serverless = require('serverless-http');

const handler = serverless(app);

module.exports = async (req, res) => {
  // Vercel strips the /api prefix when routing to api/ directory
  // Add it back so Express routes (mounted at /api/*) match correctly
  if (!req.url.startsWith('/api')) {
    req.url = '/api' + req.url;
  }
  return handler(req, res);
};
