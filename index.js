require('dotenv').config();
const express = require('express');
const cors = require('cors');
const socket = require('socket.io');
const connectDB = require('./utils/db')
const userRoutes = require('./router/UserRouter');
const MessageRoutes = require('./router/MessageRouter');
const app = express();

app.use(cors());
app.use(express.json()); 
app.use (express.urlencoded( { extended: true })); 

app.use('/api/auth', userRoutes);
app.use('/api/message', MessageRoutes);

connectDB().then(() => {  
  console.log("Database is Connected !!!")
});
const server = app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

const io = socket(server, {
  cors: {
    origin: process.env.CLIENT,
    credentials: true,
  }
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;

  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);

    if(sendUserSocket) {
      
      socket.to(sendUserSocket).emit("msg-recieve", data.message, data.file);
    }
  });

});
