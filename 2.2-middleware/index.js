const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');

const loggerMiddleware = require('./middleware/logger');
const errorMiddleware = require('./middleware/error');

const indexRouter = require('./routes/index');
const todoRouter = require('./routes/todo');

const app = express();

app.use(bodyParser());
app.use(cors());
app.use(loggerMiddleware);

app.use('/public', express.static(__dirname+"/public"));

app.use('/', indexRouter);
app.use('/api/todo', todoRouter);

app.use(errorMiddleware);

app.listen(3000);
