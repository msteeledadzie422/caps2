'use strict';

let socket = require('../hub');

jest.mock('../hub', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});
console.log = jest.fn();
describe('Vendor', () => {
  it('Emits order as expected', () => {
    const payload = {
      store: '1-206-FLOWERS',
      orderId: 'test123',
      customer: 'mandela',
      address: 'home'
    };
    socket.emit('IN-TRANSIT', payload);
    expect(console.log).toHaveBeenCalledWith(`Driver has picked up order ${payload.orderId} and is en route`);
  })
  it('Confirms delivery as expected', () => {
    const payload = {
      store: '1-206-FLOWERS',
      orderId: 'test123',
      customer: 'mandela',
      address: 'home'
    };
    socket.emit('DELIVERED', payload);
    expect(console.log).toHaveBeenCalledWith('Thank you for delivering package', payload.orderId);
  })
})