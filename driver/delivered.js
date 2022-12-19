'use strict';

module.exports = (socket) => (payload) =>  {
  setTimeout(() => {
    console.log('driver has delivered this package')
    socket.emit('DELIVERED', payload);
  }, 3000);
};