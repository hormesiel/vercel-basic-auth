const auth = require('basic-auth');
const fs = require('fs');


function check(name, pass) {
  return (name == 'admin') && (pass == 'admin');
}

function main(req, res) {
  const credentials = auth(req);

  // Check credentials
  if (!credentials || !check(credentials.name, credentials.pass)) {
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="Connexion requise"');
    returnFile(res, '/index-denied.html');
  } else {
    // We don't have a favicon, but we must handle the request or our code below will try to read that file,
    // which doesn't exist, causing a crash.
    // The file is requested when navigating to '/static/icon.png'.
    if (req.url == '/favicon.ico') {
      res.statusCode = 404;
      res.end();
      return;
    }

    // When request URL is '/', return index.html's content,
    // otherwise return the requested file's content.
    const file = req.url == '/' ? '/index.html' : req.url;
    returnFile(res, file);
  }
}

function returnFile(res, filePath) {
  fs.readFile(__dirname + filePath, (err, html) => {
    if (err)
      throw err;

    res.end(html);
  });
}

module.exports = main;

// Serve on localhost if asked to
if (process.env.SERVE == 'true') {
  const http = require('http');
  const server = http.createServer(main);
  server.listen(4444);
}
