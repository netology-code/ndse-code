const express = require('express');
const cors = require('cors');
const formData = require("express-form-data");

const {Todo} = require('./models');
const stor = {
    todo: [],
};

[1, 2, 3].map(el => {
    const newTodo = new Todo(`todo ${el}`, `desc todo ${el}`);
    stor.todo.push(newTodo);
});

const app = express();

app.use(formData.parse());
app.use(cors());

app.get('/api/todo/', (req, res) => {
    const {todo} = stor;
    res.json(todo);
});

app.get('/api/todo/:id', (req, res) => {
    const {todo} = stor;
    const {id} = req.params;
    const idx = todo.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.json(todo[idx]);
    } else {
        res.status(404);
        res.json("todo | not found");
    }
});

app.post('/api/todo/', (req, res) => {
    const {todo} = stor;
    const {title, desc} = req.body;

    const newTodo = new Todo(title, desc);
    todo.push(newTodo);

    res.status(201);
    res.json(newTodo);
});

app.put('/api/todo/:id', (req, res) => {
    const {todo} = stor;
    const {title, desc} = req.body;
    const {id} = req.params;
    const idx = todo.findIndex(el => el.id === id);

    if (idx !== -1) {
        todo[idx] = {
            ...todo[idx],
            title,
            desc,
        };
        res.json(todo[idx]);
    } else {
        res.status(404);
        res.json("todo | not found");
    }
});

app.delete('/api/todo/:id', (req, res) => {
    const {todo} = stor;
    const {id} = req.params;
    const idx = todo.findIndex(el => el.id === id);

    if (idx !== -1) {
        todo.splice(idx, 1);
        res.json(true);
    } else {
        res.status(404);
        res.json("todo | not found");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
