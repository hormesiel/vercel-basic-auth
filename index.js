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
    res.end('OK! Access granted');
  }
}

module.exports = main;

// Serve on localhost if asked to
if (process.env.SERVE == 'true') {
  const http = require('http');
  const server = http.createServer(main);
  server.listen(4444);
}
