import express from 'express';
import { Server } from 'socket.io';
import http from 'http'

const app = express();

app.use(express.static('./public'));

const server = http.createServer(app);
const io = new Server(server)

app.get('/', (req, res) => {
    res.send('/public/index.html');
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('message', msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(8000, () => { console.log(`Server run static port ...`) });




// const express = require('express');
// const app = express();
// const http = require('http');
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// io.on('connection', (socket) => {
//   console.log('a user connected');
// });

// server.listen(3000, () => {
//   console.log('listening on *:3000');
// });