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
    res.end('Access denied');
  } else {
    // When request URL is '/', return index.html's content
    // otherwise return the requested file's content
    const file = req.url == '/' ? '/index.html' : req.url;

    fs.readFile(__dirname + file, (err, html) => {
      if (err)
        throw err;

      res.end(html);
    });
  }
}

module.exports = main;

// Serve on localhost if asked to
if (process.env.SERVE == 'true') {
  const http = require('http');
  const server = http.createServer(main);
  server.listen(4444);
}
