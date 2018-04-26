var socket=io();
socket.on('connect',function(){
    console.log('connected to server');
});
socket.on('disconnect',function(){
    console.log('Disconnected from server');
});

socket.on('newMessage',function(message){
    var formattedTime=moment(message.createdAt).format('h:mm a');
    console.log('new Message.',message);
    var li=$('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);
    $('#messages').append(li);
});
socket.on('newLocationMessage',function(message){
    var formattedTime=moment(message.createdAt).format('h:mm a'); 
    var li=$('<li></li>');
    var a=$('<a target="_blank">My current locatoin</a>')
    li.text(`${message.from} ${formattedTime}: `);
    a.attr('href',message.url)
    li.append(a);
    $('#messages').append(li);
});
$(document).on('submit','#message-form',function(e){
    e.preventDefault();
    var messageTextBox=$('[name=message]');
    socket.emit('createMessage',{
        from:'User',
        text:messageTextBox.val()
    },function(){
        messageTextBox.val('')
    });
});
var locationButton=$(document);
locationButton.on('click','#send-location',function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser.')
        
    }
    $('#send-location').attr('disabled','disabled').text('Sending...');
    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        });
    },function(){
        alert('unable to fetch location')
    });
    $('#send-location').removeAttr('disabled').text('Send Location');
});