const express = require('express');
const server = express();
const actionRouter = require('./actionRouter');
const projectRouter= require('./projectRouter')

server.use(express.json())
server.use('/actions', actionRouter);
server.use('/projects', projectRouter);
server.get('/', (req, res) => {
    res.send(`<h2>Server running</h2>`)
})

module.exports = server;