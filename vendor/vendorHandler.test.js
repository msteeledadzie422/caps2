'use strict';

const handleDriver = require('./vendorHandler');

jest.mock('../hub.js', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  }
});