const http = require('http');
const requestHandler = require('./request-handler');

const server = http.createServer(requestHandler);

server.listen(8000, () => {
  console.log("El servidor esta escuchando por http://localhost:8000")
});