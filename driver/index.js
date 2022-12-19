'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3002/caps');

const MessageClient = require('../lib/messageClient');
const driver = new MessageClient('driver');

driver.publish('GET_ALL',  { queueId: 'orderId'});

driver.subscribe('PICKUP', payload => {
  console.log('Order was successfully picked up', payload.orderId);
  driver.publish('IN-TRANSIT', payload)
  console.log('Order was successfully delivered', payload.orderId);
  driver.publish('DELIVERED', payload);
});

socket.on('connect', () => {
  console.log(socket.id);
});