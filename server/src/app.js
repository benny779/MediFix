const express = require('express');
const errorHandler = require('./middleware/error');
// const RouterA = require('RouterA')

const app = express();
app.use(express.json());

app.use(errorHandler);
// app.use(RouterA)

app.get('/', async (req, res) => res.json('Hello World!'));

module.exports = app;
