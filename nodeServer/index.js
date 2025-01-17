//Node server which will handle socket io connection

// const io { Socket } = require('socket.io');

const io = require('socket.io')(8000)

const users = {};

io.on('connection', socket =>{
    socket.on('new-user-joined', name =>{
        // console.log("New user", name)
    users[socket.id] = name;
    socket.broadcast.emit('user-joined', name);   //new user connect and  another members kwon who is joined

    })

    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id])
        delete users[socket.id]
    });
   

})