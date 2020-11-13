const express = require('express');
const bodyParser = require("body-parser");

const errorMiddleware = require('./middleware/error');

const indexRouter = require('./routes/index');
const todoApiRouter = require('./routes/api/todo');
const todoRouter = require('./routes/todo');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine", "ejs");

app.use('/', indexRouter);
app.use('/todo', todoRouter);
app.use('/api/todo', todoApiRouter);

app.use(errorMiddleware);

app.listen(3000);
