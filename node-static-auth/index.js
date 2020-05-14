const protect = require('static-auth');

/*
 *
 */

const app = protect(
  '/admin',
  (user, pass) => (user === 'admin' && pass === 'admin'),
  {
    directory: __dirname + '/_static',
    realm: 'now-basic-auth.node-static-auth',
    onAuthFailed: res => {
      res.end('Restricted area, please login (admin:admin).');
    }
  }
);

module.exports = app;

/*
 *
 */

// Serve on localhost if asked to.
// NOTE: This is only used for local testing, this is NOT needed nor used by Now once deployed.
if (process.env.SERVE === 'true') {
  const http = require('http');
  const server = http.createServer(app);
  server.listen(4444, () => console.log('Listening on port 4444...'));
}
