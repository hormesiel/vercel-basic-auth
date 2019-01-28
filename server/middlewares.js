const readAuth = require('basic-auth');
const fs = require('fs');

/*
 *
 */

function basicAuth(req, res, next) {
  const credentials = readAuth(req);

  // If request contains valid credentials
  if (credentials && credentials.name == 'admin' && credentials.pass == 'admin') {
    // proceed
    next();
  }
  // Else, ask for authentication
  else {
    res.writeHead(401, { 'WWW-Authenticate': 'Basic realm="Restricted area"' });
    res.end('Restricted area. Refresh to login.');
  }
}

function serveStatic(req, res, next) {
  // If request URL ends with '/', return the directory's 'index.html'
  const filePath = req.url.endsWith('/') ? (req.url + 'index.html') : req.url;

  // Try to read the requested file
  fs.readFile(req.app.rootDir + filePath, (err, html) => {
    // If we can't (e.g. it doesn't exist)
    if (err) {
      // log the error
      console.error(err);
      // call next middleware or fallback (App#fallbackHandler)
      next();
    }
    // Else, return its content
    else
      res.end(html);
  });
}

/*
 *
 */

module.exports = { basicAuth, serveStatic };
