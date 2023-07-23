const express = require('express');
const basicAuth = require('express-basic-auth');

/*
 *
 */

const app = express();

app.use('/admin', basicAuth({
  challenge: true,
  realm: 'vercel-basic-auth.node-express',
  users: { 'user': 'pass' },
  unauthorizedResponse: 'Restricted area, please login (user:pass).'
}));

app.use(express.static(__dirname + '/_static'));

module.exports = app;