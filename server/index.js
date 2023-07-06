const express = require('express');
const { db } = require('./config/db');
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();

const httpServer = createServer(app);
const cors = require('cors')





const { adminUserRoutes } = require('./routes/adminUserRoute');
const { webUserRoutes } = require('./routes/webUserRoute');

require('dotenv').config()
app.use(express.json())
app.use(cors());
db.connect();


const io = new Server(httpServer, { cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }});

io.on("connection", (socket) => {
    console.log('Socket ', socket.id);
    //socket.on listener ile mesaj bekliyoruz
    socket.on("sendMessage", (data) => {
        io.emit("chatMessage", data)
    })
});

app.use('/api/adminusers', adminUserRoutes)
app.use('/api/webuser', webUserRoutes)


httpServer.listen(8080,()=>
{
    console.log(
    "Server started on port 8080"
    )
});


//ON - EMİT