require('dotenv').config();

const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: SocketServer } = require('socket.io');
const path = require('path');
const { wsConnection } = require('./controllers/ws.controller')
const productsRouter = require('./routes/product.route');

const port = process.env.PORT || 8080;
const app = express();
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);


app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.set('view engine','pug');
app.set('views', path.join(__dirname, './views'))

app.use('/', express.static('public'));
app.use('/', productsRouter);

httpServer.listen(port)
    .on('listening', () => console.log(`--> listening port ${port}`) )
    .on('request', (data) => console.log(`--> ${data.method} --> ${data.url}` ) )
    .on('error', (err) => console.log(`--> ${err}`) )

io.on('connection', socket => wsConnection(socket, io) )