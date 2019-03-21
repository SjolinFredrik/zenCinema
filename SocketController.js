const socketIo = require('socket.io')

module.exports = class SocketController {
  constructor(server) {
    this.io = socketIo(server)
    this.checkAfterBookedSeats()
  }
  checkAfterBookedSeats() {
    // listener for new connections
    this.io.on('connection', socket => {
      // socket is the connection to ONE client
      // console.log('a new client connected');
      // socket.emit('socket server connected', {hello:'world'});
      // socket.on('socket client connected', msg => {
      //   console.log('socket client connected', msg);
      // });
      // let the socket listen to custom events
      socket.on('seatsBooked', msg => {
        console.log(msg)
        // send the incoming message back to ALL
        // clients (all connected sockets)
        socket.emit('takenSeats', msg);
          console.log(msg, 'Redan upptagna försök på nytt!')
      });
    });
  }
}