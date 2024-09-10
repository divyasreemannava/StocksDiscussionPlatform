const socketIo = require('socket.io');

let io;
const initSocket = (server) => {
    io = socketIo(server, {
      cors: {
        origin: '*',
      },
    });
  
    io.on('connection', (socket) => {
      console.log('New client connected');
  
      // Handle new comment event
      socket.on('newComment', (data) => {
        io.emit('newComment', data); // Broadcast to all connected clients
      });
  
      // Handle new like event
      socket.on('newLike', (data) => {
        io.emit('newLike', data); // Broadcast to all connected clients
      });
  
      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  };

  const getIo = () => {
    if (!io) {
      throw new Error('Socket.io is not initialized');
    }
    return io;
  };
  
  module.exports = { initSocket, getIo };
  