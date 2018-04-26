const express=require('express');
const http=require('http');
const path=require('path');
const socketIO=require('socket.io');

var {generateMessage}=require('./utils/message');
const port=process.env.PORT || 3000;
const rootURL=(port==3000) ?'http://localhost:3000/':'https://arcane-stream-39208.herokuapp.com/';
const publicPath=path.join(__dirname,'../public');
var app=express();
var server=http.createServer(app);
var io=socketIO(server);
app.use(express.static(publicPath));
io.on('connection',(socket)=>{
    socket.emit('newUser',generateMessage('Admin','Welcome to the chat room'));
    socket.broadcast.emit('userJoined',generateMessage('Admin','New user joined'));
    socket.on('createMessage',(newMessage)=>{
        console.log('Created Message: ',newMessage);
        
        io.emit('newMessage',generateMessage(newMessage.from,newMessage.text));
        // socket.broadcast.emit('newMessage',{
        //     from:newMessage.from,
        //     text:newMessage.text,
        //     createdAt:new Date().getTime()
        // });
    });
    socket.on('disconnect',()=>{
        console.log('disconnected from client')
    });
});
server.listen(port,()=>{
    console.log(`started on port ${port}`);
});