const express = require('express');
const productsRouter = require('./routes/product.route');

const port = process.env.PORT || 8080;
const server = express();

server.use(express.json());
server.use(express.urlencoded({extended:true}))

server.use('/', express.static('public'));
server.use('/api/products', productsRouter);

server.listen(port)
    .on('listening', () => console.log(`--> listening port ${port}`) )
    .on('request', (data) => console.log(`--> ${data.method} --> ${data.url}` ) )
    .on('error', (err) => console.log(`--> ${err}`) )