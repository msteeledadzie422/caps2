'use strict';

const handleDriver = require('./driverHandler');

jest.mock('../hub.js', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  }
});