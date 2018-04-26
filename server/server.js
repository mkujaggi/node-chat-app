const express=require('express');
const http=require('http');
const path=require('path');
const socketIO=require('socket.io');

const port=process.env.PORT || 3000;
const rootURL=(port==3000) ?'http://localhost:3000/':'https://arcane-stream-39208.herokuapp.com/';
const publicPath=path.join(__dirname,'../public');
var app=express();
var server=http.createServer(app);
var io=socketIO(server);
app.use(express.static(publicPath));
io.on('connection',(socket)=>{
    console.log('New user connected');
    socket.emit('newEmail',{
        from: 'mku@abc.com',
        text:'some email text',
        subject:'Random Email'
    });
    socket.emit('newMessage',{
        to:'test@abc.com',
        text:'hello from server',
        createdAt:new Date()
    });
    socket.on('createMessage',(newMessage)=>{
        console.log('Created Message: ',newMessage);
    });
    socket.on('disconnect',()=>{
        console.log('disconnected from client')
    });
});
server.listen(port,()=>{
    console.log(`started on port ${port}`);
});