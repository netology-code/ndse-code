const express = require('express');
const router = express.Router();
const {Todo} = require('../models');

const stor = {
    todo: [],
};

[1, 2, 3].map(el => {
    const newTodo = new Todo(`todo ${el}`, `desc todo ${el}`);
    stor.todo.push(newTodo);
});

router.get('/', (req, res) => {
    const {todo} = stor;
    res.render("todo/index", {
        title: "ToDo",
        todos: todo,
    });
});

router.get('/create', (req, res) => {
    res.render("todo/create", {
        title: "ToDo | create",
        todo: {},
    });
});

router.post('/create', (req, res) => {
    const {todo} = stor;
    const {title, desc} = req.body;

    const newTodo = new Todo(title, desc);
    todo.push(newTodo);

    res.redirect('/todo')
});

router.get('/:id', (req, res) => {
    const {todo} = stor;
    const {id} = req.params;
    const idx = todo.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.render("todo/view", {
            title: "ToDo | view",
            todo: todo[idx],
        });
    } else {
        res.status(404).redirect('/404');
    }
});

router.get('/update/:id', (req, res) => {
    const {todo} = stor;
    const {id} = req.params;
    const idx = todo.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.render("todo/update", {
            title: "ToDo | view",
            todo: todo[idx],
        });
    } else {
        res.status(404).redirect('/404');
    }
});

router.post('/update/:id', (req, res) => {
    const {todo} = stor;
    const {id} = req.params;
    const {title, desc} = req.body;
    const idx = todo.findIndex(el => el.id === id);

    if (idx !== -1) {
        todo[idx] = {
            ...todo[idx],
            title,
            desc,
        };
        res.redirect(`/todo/${id}`);
    } else {
        res.status(404).redirect('/404');
    }
});

router.post('/delete/:id', (req, res) => {
    const {todo} = stor;
    const {id} = req.params;
    const idx = todo.findIndex(el => el.id === id);

    if (idx !== -1) {
        todo.splice(idx, 1);
        res.redirect(`/todo`);
    } else {
        res.status(404).redirect('/404');
    }
});

module.exports = router;

