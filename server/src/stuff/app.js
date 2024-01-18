const express = require('express');
const { i18next, i18nextMiddleware } = require('./i18n');

const errorHandler = require('../middleware/error');
// const RouterA = require('RouterA')

const app = express();
app.use(i18nextMiddleware.handle(i18next));
app.use(express.json());

app.use(errorHandler);
// app.use(RouterA)

app.get('/language', async (req, res) => {
  res.json({ languages: i18next.languages, test: req.t('test') });
});

app.get('/', async (req, res) => res.json('Hello World!'));

module.exports = app;
