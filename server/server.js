const express=require('express');
const http=require('http');
const path=require('path');
const socketIO=require('socket.io');

var {generateMessage,generateLocationMessage}=require('./utils/message');
const port=process.env.PORT || 3000;
const rootURL=(port==3000) ?'http://localhost:3000/':'https://arcane-stream-39208.herokuapp.com/';
const publicPath=path.join(__dirname,'../public');
var app=express();
var server=http.createServer(app);
var io=socketIO(server);
app.use(express.static(publicPath));
io.on('connection',(socket)=>{
    socket.emit('newMessage',generateMessage('Admin','Welcome to the chat room'));
    socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));
    socket.on('createMessage',(newMessage,callback)=>{
        console.log('Created Message: ',newMessage);
        
        io.emit('newMessage',generateMessage(newMessage.from,newMessage.text));
        callback('Acknowledgment from server');
    });
    socket.on('createLocationMessage',(cords)=>{
        io.emit('newLocationMessage',generateLocationMessage('Admin',cords.latitude,cords.longitude));
    });
    socket.on('disconnect',()=>{
        console.log('disconnected from client')
    });
});
server.listen(port,()=>{
    console.log(`started on port ${port}`);
});