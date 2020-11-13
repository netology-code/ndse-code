module.exports = (req, res) => {
    res.status(404);
    const content = '404 | not found';
    res.send(content);
};
