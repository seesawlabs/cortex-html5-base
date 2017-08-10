const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');

const app = express();

app.use(express.static('build'));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws, req) {
  const location = url.parse(req.url, true);

  ws.on('message', function incoming(message) {
    console.log('recieved: %s', message);
    if (message === "TOUCHED!") {
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send("TOUCHED");
        }
      });
    }
  });
});

server.listen(8080, function listening() {
  console.log('Listening on %d', server.address().port);
});
