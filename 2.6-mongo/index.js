const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');


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

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        const PasswordDB = 'xxxxxxxxxx';
        const NameDB = 'mongoose';
        const UrlDB = `mongodb+srv://root:${PasswordDB}@cluster0.grfrs.mongodb.net/${NameDB}`;
        //const UrlDB = `mongodb://localhost:27017/mydb`;
        await mongoose.connect(UrlDB);

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    } catch (e) {
        console.log(e);
    }
}

start();
