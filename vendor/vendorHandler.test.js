'use strict';

const { vendorHandler, vendorDelivered } = require('./index');

let socket = require('../hub');

jest.mock('../hub', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});
console.log = jest.fn();
describe('Vendor', () => {
  it('emits order as expected', () => {
    const payload = {
      store: '1-206-FLOWERS',
      orderId: 'test123',
      customer: 'Mandela',
      address: 'home'
    };
    vendorHandler(socket)(payload);
    expect(console.log).toHaveBeenCalledWith('Order picked up: ', payload);
    expect(socket.emit).toHaveBeenCalledWith('PICKUP', payload)
  })
  it('thanks the driver', () => {
    vendorDelivered({customer: 'Mandela'});
    expect(console.log).toHaveBeenCalledWith(`Driver delivered ${payload.orderID}`)
  })
})