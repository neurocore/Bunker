const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:5173', // DEV only!
    methods: ['GET', 'POST']
  }
});

// app.use(express.static('public'));

io.on('connection', socket => {
  socket.on('join', room_id => {
    socket.join(room_id);
    socket.emit('message', `room ${room_id} created`);
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Game server running on port ${port}`);
});
