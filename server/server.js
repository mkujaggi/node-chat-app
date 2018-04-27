const express=require('express');
const http=require('http');
const path=require('path');
const socketIO=require('socket.io');

const {Users}=require('./utils/users');
const {isRealString}=require('./utils/validation');
var {generateMessage,generateLocationMessage}=require('./utils/message');
const port=process.env.PORT || 3000;
const rootURL=(port==3000) ?'http://localhost:3000/':'https://arcane-stream-39208.herokuapp.com/';
const publicPath=path.join(__dirname,'../public');

var app=express();
var server=http.createServer(app);
var io=socketIO(server);
var users=new Users();

app.use(express.static(publicPath));
io.on('connection',(socket)=>{
    
    socket.on('join',(params,callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and Room name are required.');
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id,params.name,params.room);

        io.to(params.room).emit('updateUserList',users.getUserList(params.room));
        socket.emit('newMessage',generateMessage('Admin','Welcome to the chat room'));
        socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined`));
        callback();
    });
    socket.on('createMessage',(newMessage,callback)=>{
        console.log('Created Message: ',newMessage);
        
        io.emit('newMessage',generateMessage(newMessage.from,newMessage.text));
        callback();
    });
    socket.on('createLocationMessage',(cords)=>{
        io.emit('newLocationMessage',generateLocationMessage('User',cords.latitude,cords.longitude));
    });
    socket.on('disconnect',()=>{
        var user=users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit('updateUserList',users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left.`))
        }
        console.log('disconnected from client')
    });
});
server.listen(port,()=>{
    console.log(`started on port ${port}`);
});