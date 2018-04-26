var socket=io();
socket.on('connect',function(){
    console.log('connected to server');
    // socket.emit('createMessage',{
    //     to:'kk@abc.com',
    //     text:'Sendind test message'
    // });
});
socket.on('disconnect',function(){
    console.log('Disconnected from server');
});

socket.on('newMessage',function(message){
    console.log('new Message.',message);
});
socket.on('newUser',function(message){
    console.log(': ',message);
});
socket.on('userJoined',function(message){
    console.log(': ',message);
});
