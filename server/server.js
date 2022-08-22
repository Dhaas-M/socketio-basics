const { instrument } = require('@socket.io/admin-ui')

const io = require('socket.io')(3000,{
    cors:{
        origin:["http://localhost:8081","https://admin.socket.io"],
    },
})

io.on('connection', socket => {
    console.log(socket.id)
    socket.on('send-message', (message,room) => {
        //io.emit('recieve',message) 
        if(room === "") socket.broadcast.emit('recieve',message) //everyone
        else socket.to(room).emit('recieve',message) //private rooms
        console.log(message);
        socket.on('join-room', (room ,cb)=> {
            socket.join(room)
            cb(`joined to room ${room}`)
        })
    })
})

instrument(io, { auth: false})