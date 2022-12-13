'use strict';

const eventPool = require('../eventpool');
const Chance = require('chance');

const chance = new Chance();

function newOrder () {
  setTimeout(() => {
    console.log('------------New Package Ready-------------');
    let payload = { 
      store: chance.company(),
      orderID: chance.guid(),
      customer: chance.name(),
      address: `${chance.city()}, ${chance.state()}`,
    }
    eventPool.emit('PICKUP', payload)
  }, 3000)
}

function deliveredConfirmation(payload) {
  setTimeout(() => {
    console.log(`Thank you, ${payload.customer}.`);
  }, 2000)
}

module.exports = { newOrder, deliveredConfirmation };