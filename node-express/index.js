const express = require('express');
const basicAuth = require('express-basic-auth');

/*
 *
 */

const app = express();

app.use('/admin', basicAuth({
  challenge: true,
  realm: 'now-basic-auth.node-express',
  users: { 'admin': 'admin' },
  unauthorizedResponse: 'Restricted area, please login (admin:admin).'
}));

app.use(express.static(__dirname + '/_static'));

/*
 *
 */

app.listen(4444, () => console.log('Listening on port 4444...'));
