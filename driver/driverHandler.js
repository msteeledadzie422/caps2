'use strict';

let eventpool = require('../eventpool');

module.exports = (payload) => {
  setTimeout(() => {
    console.log(`DRIVER: picked up ${payload.orderID}`),
    eventpool.emit('IN-TRANSIT', payload);
  }, 2000);

  setTimeout(() => {
    console.log(`DRIVER: delivered ${payload.orderID}`),
    eventpool.emit('DELIVERED', payload)
  }, 8000)
}