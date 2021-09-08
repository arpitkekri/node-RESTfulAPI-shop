// This file have all codes required to spin a server

const http = require('http') // importing http
const app = require('./app');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);

// Get request on http://localhost:3000/products