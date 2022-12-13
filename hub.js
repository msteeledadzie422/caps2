'use strict';

const eventPool = require('./eventpool');
const Chance = require('chance');

const chance = new Chance();

const { newOrder, deliveredConfirmation } = require('./vendor/vendorHandler');
const driverHandler = require('./driver/driverHandler');

eventPool.on('NEW_ORDER', newOrder)
eventPool.on('PICKUP', driverHandler);
eventPool.on('DELIVERED', deliveredConfirmation);
eventPool.on('IN_TRANSIT', inTransit);
eventPool.on('DELIVERED', delivered);
eventPool.on('PICKUP', pickUp);

function pickUp(payload){
    setTimeout(() => {
        const date = chance.date();
        const time = date.toDateString();
        console.log('Event: Pickup', `Time: ${time}`, payload)
    }, 2000);
  }
  
  function inTransit(payload){
    setTimeout(() => {
        const date = chance.date();
        const time = date.toDateString();
        console.log('Event: In Transit', `Time: ${time}`, payload)
    }, 2000);
  }
  
  function delivered(payload){
    setTimeout(() => {
        const date = chance.date();
        const time = date.toDateString();
        console.log('Event: Delivered', `Time: ${time}`, payload)
    }, 2000);
  }

setInterval(() => {
    console.log('---------New Order Inbound ---------');
    let payload = {text: 'New Order Arriving'};
    eventPool.emit('NEW_ORDER', payload)
}, 5000)