'use strict';

module.exports = (socket) => (payload) => {

  setTimeout(() => {
    console.log(`Picking up ${payload.orderID}`, payload);
    socket.emit('IN-TRANSIT', payload);
  }, 3000);
};