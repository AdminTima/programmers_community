require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routes');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const http = require('http');
const { Server } = require('socket.io');
const messageService = require('./service/message-service');


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:8080',
    }
});


io.on('connection', (socket) => {
    console.log('connected user', socket.id);
    socket.on('join_room', (roomId) => {
        console.log('joinded', roomId);
        socket.join(roomId);
    });
    socket.on('send_message', async (message) => {
        const  userId = socket.handshake.auth.userId;
        if(userId) {
            const newMessage = await messageService.newMessage(userId, message.roomId, message.messageText, message.messageImage);
            console.log(message.messageImage);
            io.to(message.roomId).emit('new_message', newMessage);
        }
    });
});

app.use('/media',express.static('media'));
app.use(express.json());
app.use(cors({credentials: true, origin: 'http://localhost:8080'}));
app.use(fileUpload());
app.use(cookieParser());


app.use('/api', router);

app.get('/', (req, res) => {
    res.json('hello world!');
})


async function start() {
    try {
        await mongoose.connect('mongodb://localhost:27017/community_progs');
        server.listen(5000, () => console.log('Strarttedddd...'))
    }catch (err) {
        console.log(err);
    }
}

start();

