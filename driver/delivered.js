'use strict';

module.exports = (socket) => (payload) =>  {
  setTimeout(() => {
    socket.emit('DELIVERED', payload);
  }, 3000);
};