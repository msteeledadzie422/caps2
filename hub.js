'use strict';

const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;
const Queue = require('./lib/queue');

const server = new Server(PORT);
console.log('listening on port', PORT);

const caps = server.of('/caps');
const messageQueue = new Queue();

caps.on('connection', (socket) => {
  console.log('Socket connected to Event Server!', socket.id);
  console.log('Socket connected to caps namespace!', socket.id);

  socket.on('JOIN', (queueId) => {
    console.log(`You have entered the ${queueId} room`);
 
    socket.onAny((event, payload) => {
      const date = new Date();
      const time = date.toTimeString();
      console.log('EVENT', {event, time, payload});
    });
    socket.emit('JOIN',queueId)
  });

  socket.on('PICKUP', (payload) => {
    console.log('Serverif PICKUP event', payload);
    let currentQueue = messageQueue.read(payload.queueId);
    if (!currentQueue) {
      let queueKey = messageQueue.store(payload.queueId, new Queue());
      currentQueue = messageQueue.read(queueKey);
    }
    currentQueue.store(payload.messageId, payload);
    socket.broadcast.emit('PICKUP', payload);
  });

  socket.on('IN-TRANSIT', (payload) => {
    caps.emit('IN-TRANSIT', payload);
  });

  socket.on('DELIVERED', (payload) => {
    let currentQueue = messageQueue.read(payload.queueId);
    if (!currentQueue){
      let queueKey = messageQueue.store(payload.queueId, new Queue());
      currentQueue = messageQueue.read(queueKey);
    }
    currentQueue.store(payload.messageId, payload);
    caps.emit('DELIVERED', payload);
  });

  socket.on('RECEIVED', (payload) => {
    console.log('Server RECEIVED event', payload);
    let currentQueue = messageQueue.read(payload.queueId);
    if(!currentQueue){
      throw new Error('no queue created');
    }
    let message = currentQueue.remove(payload.messageId);
    socket.to(payload.queueId).emit('RECEIVED', message);
  });

  socket.on('GET_ALL', (payload) => {
    console.log('This happened');
    let currentQueue = messageQueue.read(payload.queueId);
    if(currentQueue && currentQueue.data){
      Object.keys(currentQueue.data).forEach(messageId => {
        caps.emit('DELIVERED', currentQueue.read(messageId));
      });
    }
  });
});