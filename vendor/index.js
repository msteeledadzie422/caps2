'use strict';

const { io } = require('socket.io-client');
const Chance = require('chance');
const MessageClient = require('../lib/messageClient')

const socket = io('http://localhost:3002/caps');
const chance = new Chance();

const acme = new MessageClient('Acme Widgets');
const flowers = new MessageClient('1-800-Flowers');

acme.subscribe('IN-TRANSIT', (payload) => {
  console.log(`Confirming pickup of order: ${payload.orderId}, en route`);
})

acme.subscribe('DELIVERED', payload => {
  console.log('Thank you for delivering package: ', payload.orderId);
  acme.publish('RECEIVED', payload);
});

setInterval(() => {
  const payload = {
    store: 'Acme Widgets',
    orderId: chance.guid(),
    name: chance.name(),
    address: chance.address(),
  }

  console.log('-----new package ready-----', payload);
  acme.publish('PICKUP', payload);
}, 7000);

acme.subscribe('IN-TRANSIT', (payload) => {
  console.log(`Confirming pickup of order ${payload.orderId}, en route`);
})

flowers.subscribe('DELIVERED', payload => {
  console.log('Thank you for delivering package: ', payload.orderId);
  flowers.publish('RECEIVED', payload);
})

setInterval(() => {
  const payload = {
    store: '1-800-Flowers',
    orderId: chance.guid(),
    name: chance.name(),
    address:chance.address(),
  }

  console.log('-----new package ready-----', payload);
  flowers.publish('PICKUP', payload);
}, 7000);