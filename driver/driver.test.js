'use strict';

let socket = require('../hub');

jest.mock('../hub', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});
console.log = jest.fn();
describe('Driver', () => {
  it('Confirms pickup as expected', () => {
    const payload = {
      store: '1-206-FLOWERS',
      orderId: 'test123',
      customer: 'mandela',
      address: 'home'
    };
    socket.emit('PICKUP', payload);
    expect(console.log).toHaveBeenCalledWith('Order was successfully picked up', payload.orderId)
    expect(console.log).toHaveBeenCalledWith('Order was successfully delivered', payload.orderId);
  })
})