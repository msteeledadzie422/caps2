'use strict';

module.exports = (socket) => (payload) => {
  console.log(`Driver delivered ${payload.orderID}`);
};