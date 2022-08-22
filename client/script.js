import { io } from 'socket.io-client'

const joinButton = document.getElementById('join')
const form = document.getElementById('form')
const message = document.getElementById('message')
const room = document.getElementById('room')

const socket = io('http://localhost:3000')
socket.on('connect',() =>{
    displaymessage(`you connected with id ${socket.id}`)
})

//socket.emit('custom-event','dhaas',69)
socket.on('recieve', message => {
    displaymessage(message)
})
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const msg = message.value
    const id = room.value
    console.log(msg)
    if(msg === "") return
    displaymessage(msg)
    socket.emit('send-message',msg,id)

    message.value=""
})

joinButton.addEventListener('click', ()=>{
    const id = room.value
    socket.emit('join-room',id,message => {
        displaymessage(message)
    }) //custom rooms
})

function displaymessage(msg){
    const div = document.createElement('div')
    div.textContent=msg
    document.getElementById('message-box').append(div)
}