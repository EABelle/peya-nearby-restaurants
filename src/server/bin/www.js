#!/usr/bin/env node

import app from '../app';
import http from 'http';

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('listening', onListening);

function onListening() {
  if (process.env.NODE_ENV === 'development') {
    console.log('Listening on ' + port);
  }
}
