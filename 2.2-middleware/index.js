const express = require('express');
const bodyParser = require("body-parser");

const loggerMiddleware = require('./middleware/logger');
const errorMiddleware = require('./middleware/error');

const indexRouter = require('./routes/index');
const todoRouter = require('./routes/todo');

const app = express();

app.use(bodyParser.json());
app.use(loggerMiddleware);

app.use('/', indexRouter);
app.use('/api/todo', todoRouter);

app.use(errorMiddleware);

app.listen(3000);
