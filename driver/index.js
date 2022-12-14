'use strict';

const { io } = require('socket.io-client');

const createTransit = require('./driverHandler');
const createDelivered = require('./delivered');

const socket = io('http://localhost:3002/caps');


const transitOrder = createTransit(socket);
const deliveredOrder = createDelivered(socket);

socket.emit('JOIN', 'Caps');

socket.on('PICKUP', transitOrder);
socket.on('IN-TRANSIT', deliveredOrder);

socket.on('connect', () => {
  console.log(socket.id);
});