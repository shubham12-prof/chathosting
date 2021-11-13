const socket = io('http://localhost:8000');

const form = document.getElementById("send-container");

const messageInput =document.getElementById("messageInp");

const messageContainer =document.querySelector(".container");
var audio =new Audio("sword.mp3");

const append = (message, position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
        }
}

form.addEventListener('submit' ,(e) => {
    e.preventDefault();
    const message =messageInput.value;
    append(`you :${message}`, 'right');
    socket.emit('send',message);
    messageInput.value = '';
})

const namee = prompt("enter your namee");

socket.emit('new-user-joined', namee);

socket.on('user-joined', namee =>{
    append(`${namee} joined the chat`,  'right')
})

socket.on('recieve', data =>{
    append(`${data.namee}: ${data.message}`,'left')
})

socket.on('left', namee =>{
    append(`${namee} left the chat`,'right')
})