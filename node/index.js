const readAuth = require('basic-auth');
const serveStatic = require('serve-static');

/*
 *
 */

const auth = (req, res, next) => {
  const credentials = readAuth(req);

  // If request contains valid credentials
  if (credentials && credentials.name == 'admin' && credentials.pass == 'admin') {
    // proceed
    next();
  }
  // Else, ask for authentication
  else {
    res.writeHead(401, { 'WWW-Authenticate': 'Basic realm="now-basic-auth-node"' });
    res.end('Restricted area. Please login (admin:admin).');
  }
};

const serve = serveStatic(__dirname + '/_static');

/*
 *
 */

const app = (req, res) => {
  // If requests admin area
  if (req.url.startsWith('/admin')) {
    // auth then serve
    auth(req, res, () => {
      serve(req, res, () => {
        res.statusCode = 404;
        res.end('404 Not Found');
      });
    });
  }
  // Else (public area)
  else {
    // just serve
    serve(req, res, () => {
      res.statusCode = 404;
      res.end('404 Not Found');
    });
  }
};

/*
 *
 */

module.exports = app;

// Serve on localhost if asked to
if (process.env.SERVE === 'true') {
  const http = require('http');
  const server = http.createServer(app);
  server.listen(4444, () => console.log('Listening on port 4444...'));
}
