'use strict';

const eventPool = require('../eventPool');
const { newOrder, deliveredConfirmation } = require('./vendorHandler');

jest.mock('../eventPool.js', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});
console.log = jest.fn();

describe('Handle Vendor', () => {
  test('Emit new order pickup as expected', () => {
    newOrder();
    expect(console.log).toHaveBeenCalledWith('------------New Package Ready-------------');
    expect(eventPool.emit).toHaveBeenCalledWith('PICKUP', payload);
  });
  test('Emit delivered confirmation as expected', () => {
    let payload = { 
      store: 'Walmart',
      orderID: 'test1234',
      customer: 'Mandela',
      address: 'home',
    }
    deliveredConfirmation(payload)
    expect(console.log).toHaveBeenCalledWith(`Thank you, ${payload.customer}.`);
  });
});