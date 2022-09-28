const express = require('express');
const path = require('path');
const productsRouter = require('./routes/product.route');

const port = process.env.PORT || 8080;
const server = express();

server.use(express.json());
server.use(express.urlencoded({extended:true}))

server.set('view engine','pug');
server.set('views', path.join(__dirname, './views'))

server.use('/', express.static('public'));
server.use('/', productsRouter);

server.listen(port)
    .on('listening', () => console.log(`--> listening port ${port}`) )
    .on('request', (data) => console.log(`--> ${data.method} --> ${data.url}` ) )
    .on('error', (err) => console.log(`--> ${err}`) )