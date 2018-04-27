var socket=io();
function scrollToBottom(){
    // Selectors
    var messages=$('#messages');
    var newMessage=messages.children('li:last-child');
    // Heoghts
    var clientHeight=messages.prop('clientHeight');
    var scrollTop=messages.prop('scrollTop');
    var scrollHeight=messages.prop('scrollHeight');
    var newMessageHeight=newMessage.innerHeight();
    var lastMessageHeight=newMessage.prev().innerHeight();

    if((clientHeight+scrollTop+newMessageHeight+lastMessageHeight)>=scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}
socket.on('connect',function(){
    console.log('connected to server');
});
socket.on('disconnect',function(){
    console.log('Disconnected from server');
});

socket.on('newMessage',function(message){
    var formattedTime=moment(message.createdAt).format('h:mm a');
    var template=$('#message-template').html();
    var html=Mustache.render(template,{
        text:message.text,
        from:message.from,
        createdAt:formattedTime
    });
    $('#messages').append(html);
    scrollToBottom();
});
socket.on('newLocationMessage',function(message){
    var formattedTime=moment(message.createdAt).format('h:mm a');
    var template=$('#locationMessage-template').html();
    var html=Mustache.render(template,{
        from:message.from,
        createdAt:formattedTime,
        url:message.url
    });
    $('#messages').append(html);
    scrollToBottom();
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