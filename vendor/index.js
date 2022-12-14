'use strict';

const { io } = require('socket.io-client');
const Chance = require('chance');

const vendorHandler = require('./vendorHandler');
const vendorDelivered = require('./delivered');

const socket = io('http://localhost:3002/caps');

const chance = new Chance();

socket.on('PICKUP', vendorHandler);
socket.on('DELIVERED', vendorDelivered);

socket.on('connect', () => {
  setInterval(() => {
    let payload = {
      store: chance.company(),
      orderID: chance.guid(),
      customer: chance.name(),
      address: `${chance.city()}, ${chance.state()}`,
    };

    socket.emit('JOIN', `${payload.store}`);

    console.log('-------transmitting new package---------', payload);
    socket.emit('PICKUP', payload);
  }, 5000);
});