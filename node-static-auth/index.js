const protect = require('static-auth');
const safeCompare = require('safe-compare');

/*
 *
 */

const app = protect(
  '/admin',
  (username, password) => safeCompare(username, 'user') && safeCompare(password, 'pass'),
  {
    directory: __dirname + '/_static',
    realm: 'vercel-basic-auth.node-static-auth',
    onAuthFailed: res => {
      res.end('Restricted area, please login (user:pass).');
    }
  }
);

module.exports = app;