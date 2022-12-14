'use strict';

const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;

const server = new Server(PORT);

const caps = server.of('/caps');

caps.on('connection', (socket) => {
  console.log('Socket connected to Event Server!', socket.id);
  console.log('Socket connected to caps namespace!', socket.id);

  socket.on('JOIN', (room) => {
    console.log(`You have entered the ${room} room`);
    socket.join(room);
    socket.onAny((event, payload) => {
      const date = new Date();
      const time = date.toTimeString();
      console.log('EVENT', {event, time, payload});
    });
  });

  socket.on('PICKUP', (payload) => {
    caps.emit('PICKUP', payload);
  });

  socket.on('IN-TRANSIT', (payload) => {
    caps.emit('IN-TRANSIT', payload);
  });

  socket.on('DELIVERED', (payload) => {
    caps.emit('DELIVERED', payload);
  });
});