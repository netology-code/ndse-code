const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');


router.get('/', async (req, res) => {
    const todo = await Todo.find();
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

router.post('/create', async (req, res) => {
    const {title, desc} = req.body;

    const newTodo = new Todo({
        title, desc,
    });

    try {
        await newTodo.save();
        res.redirect('/todo');
    } catch (e) {
        console.error(e);
    }
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    let todo;

    try {
        todo = await Todo.findById(id);
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }

    res.render("todo/view", {
        title: "ToDo | view",
        todo: todo,
    });
});

router.get('/update/:id', async (req, res) => {
    const {id} = req.params;
    let todo;
    try {
        todo = await Todo.findById(id);
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }

    res.render("todo/update", {
        title: "ToDo | view",
        todo: todo,
    });
});

router.post('/update/:id', async (req, res) => {
    const {id} = req.params;
    const {title, desc} = req.body;

    try {
        await Todo.findByIdAndUpdate(id, {title, desc});
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }

    res.redirect(`/todo/${id}`);
});

router.post('/delete/:id', async (req, res) => {
    const {id} = req.params;

    try {
        await Todo.deleteOne({_id: id});
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }

    res.redirect(`/todo`);
});

module.exports = router;

