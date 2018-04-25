const express=require('express');
const http=require('http');
const path=require('path');
const socketIO=require('socket.io');

const port=process.env.PORT || 3000;
const rootURL=(port==3000) ?'http://localhost:3000/':'https://arcane-stream-39208.herokuapp.com/';
;
const publicPath=path.join(__dirname,'../public');
var app=express();
var server=http.createServer(app);
var io=socketIO(server);
app.use(express.static(publicPath));
io.on('connection',(socket)=>{
    console.log('New user connected');
    socket.on('disconnect',()=>{
        console.log('disconnected from client')
    });
});
server.listen(port,()=>{
    console.log(`started on port ${port}`);
});