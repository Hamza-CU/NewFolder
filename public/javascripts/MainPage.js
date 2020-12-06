const socket = io('http://localhost:3000')
const messageForm = document.getElementById('send-container')
const messageContainer = document.getElementById('message-container')
const messageInput = document.getElementById('message-input')

if (messageForm != null) {
  appendMessage('You joined');
  socket.emit('user-joined', lobbyID, username);

  messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value;
    appendMessage(`${username}: ${message}`);
    socket.emit('send-message', lobbyID, message);
    messageInput.value = '';
  })
}


socket.on('chat-message', data => {
  console.log(data);
  appendMessage(`${data.username}: ${data.message}`);
})

socket.on('user-connected', username => {
  appendMessage(`${username} joined the room`)
})

socket.on('user-disconnected', username => {
  appendMessage(`${username} left the room`)
})

function appendMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageContainer.append(messageElement)
}
