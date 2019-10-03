//make connection

let socket = io.connect('http://localhost:4000');

//Query DOM
let message = document.querySelector('#message'),
 handle = document.querySelector('#handle'),
 btn = document.querySelector('#send'),
 output = document.querySelector('#output'),
 feedback = document.querySelector('#feedback');
 

//Emit messages

btn.addEventListener('click', (data) => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
});

message.addEventListener('keypress', () => {
    socket.emit('typing', handle.value);
});

//Listen to messages
socket.on('chat', (data) => {
    feedback.innerHTML = "";
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', (data) => {
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>'
});