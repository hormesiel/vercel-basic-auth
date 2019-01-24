const App = require('./server/App');
const mw = require('./server/middlewares');

/*
 *
 */

const app = new App(__dirname);

app.get('/favicon.ico', mw.serveStatic);
app.get('/*', mw.basicAuth, mw.serveStatic);

function main(req, res) {
  console.log('GET ' + req.url);
  app.process(req, res);
}

// Required by Now's node builder (https://zeit.co/docs/v2/deployments/official-builders/node-js-now-node/)
module.exports = main;

/*
 *
 */

// Serve on localhost if asked to
if (process.env.SERVE == 'true') {
  const http = require('http');
  const server = http.createServer(main);
  server.listen(4444);
}
