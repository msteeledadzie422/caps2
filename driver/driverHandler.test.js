'use strict';

const { transitOrder, deliveredOrder } = require('./index');
let socket = require('../hub');

jest.mock('../hub', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});
console.log = jest.fn();

describe('Driver', () => {
  it('picks up order and emits transit as expected', () => {
    const payload = {
      store: '1-206-FLOWERS',
      orderId: 'test123',
      customer: 'Mandela',
      address: 'home',
    };
    transitOrder(socket)(payload);
    expect(console.log).toHaveBeenCalledWith(`Picking up ${payload.orderId}`);
    expect(socket.emit).toHaveBeenCalledWith('IN_TRANSIT', payload);
  });
  it('delivers as expected', () => {
    const payload = {
      store: '1-206-FLOWERS',
      orderId: 'test123',
      customer: 'Mandela',
      address: 'home',
    };
    deliveredOrder(socket)(payload);
    expect(console.log).toHaveBeenCalledWith('driver has delivered this package');
    expect(socket.emit).toHaveBeenCalledWith('DELIVERED', payload);
  });
});