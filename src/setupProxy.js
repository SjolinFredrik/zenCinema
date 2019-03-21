const proxy = require('http-proxy-middleware');
 
module.exports = function(app) {
  // added proxy for socket.io so the damned thing can work
  app.use(proxy('/socket.io/', { target: 'http://localhost:3001' 
  }));
  app.use(proxy('/json/', { target: 'http://localhost:3001/' 
  }));
};