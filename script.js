const socket= io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')

const messageForm = document.getElementById("send-container")
const messageInput = document.getElementById("message-input")
console.log(messageForm)
console.log(messageInput)
const name=prompt('what is your name?')
appendMessage('you joined')
socket.emit('new-user',name)
socket.on('chat-message',data=>{
	appendMessage("".concat(data.name).concat(":").concat(data.message))

})
socket.on('user-connected',name=>{
	appendMessage("".concat(name).concat(" connected"))
})
socket.on('user-disconnected',name=>{
	appendMessage("".concat(name).concat(" disconnected"))
})
messageForm.addEventListener('submit',e=>{
	e.preventDefault()
	const message=messageInput.value
	console.log(message)
	appendMessage("you :".concat(message))
	socket.emit('send-chat-message',message)
	messageInput.value=''
})

function appendMessage(message){
	const messageElement=document.createElement('div')
	messageElement.innerText=message
	messageContainer.append(messageElement)
}