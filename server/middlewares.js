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
  const appRoot = req.app.rootDir;

  // Check if the resource exists and if it's a directory or a file
  let file;
  try {
    file = fs.statSync(appRoot + req.url);
  } catch (err) {
    console.error(err);
    next();
    return;
  }

  // If it's a directory return its 'index.html' file, otherwise return the requested file
  let path;
  if (file.isDirectory()) {
    if (req.url.endsWith('/'))
      path = appRoot + req.url + 'index.html';
    else
      path = appRoot + req.url + '/index.html';
  }
  else
    path = appRoot + req.url;

  // Try to read the requested file
  fs.readFile(path, (err, html) => {
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
