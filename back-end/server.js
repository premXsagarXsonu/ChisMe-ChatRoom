require('dotenv').config();
const mongoose = require("mongoose");
require("cors");

// MongoDB connection
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log("MongoDB Connected!")
});

//DB models
require('./models/user');
require('./models/message');
require('./models/chatroom');

// models for sockets
const Message = mongoose.model("Message");
const User = mongoose.model("User");
const chatroomName = mongoose.model("Chatroom");

// Server 
const app = require("./app");

const server = app.listen(8000, () => {
    console.log("Server is listning on port 8000")
});

//Sockets
const jwt = require('jsonwebtoken');

const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
        rejectUnauthorized: false
    }
});


io.use(async (socket, next) => {
    try {
        const token = socket.handshake.query.token;
        const payload = await jwt.verify(token, process.env.SECRET);
        socket.userId = payload.id;
        next();

    } catch (err) { }
});

io.on('connection', (socket) => {
    console.log("Connected : " + socket.userId);

    socket.on("disconnect", () => {
        console.log("Disconnected : " + socket.userId);
    });

    socket.on("joinRoom", ({ chatroomId }) => {
        socket.join(chatroomId);
        console.log("A user joined chatroom : " + chatroomId);
    });
    socket.on("leaveRoom", ({ chatroomId }) => {
        socket.leave(chatroomId);
        console.log("A user left chatroom : " + chatroomId);
    });

    socket.on("chatroomMessage", async ({ chatroomId, message }) => {
       
        const user = await User.findOne({ _id: socket.userId });

        const newMessage = new Message({
            chatroom: chatroomId,
            user: socket.userId,
            message,
        });
    

        const msgidget = await newMessage.save();

        const room = await chatroomName.findOne({ _id: chatroomId });
        const RoomName = room.name;

        SendMessage = {
            id: msgidget._id,
            message,
            name: user.name,
            userId: socket.userId,
            RoomName,

        };


        io.to(chatroomId).emit("newMessage", SendMessage);

    
    });
});

