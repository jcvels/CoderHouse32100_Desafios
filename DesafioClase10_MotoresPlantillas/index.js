const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const productsRouter = require('./routes/product.route');

const port = process.env.PORT || 8080;
const server = express();

server.use(express.json());
server.use(express.urlencoded({extended:true}))

if( process.argv[2] === 'pug' ) {
    console.log('--> using PUG template engine');
    server.set('view engine','pug');
}

if( process.argv[2] === 'ejs' ) {
    console.log('--> using EJS template engine');
    server.set('view engine', 'ejs')
}

if( process.argv[2] === 'hbs' ) {
    console.log('--> using HANDELBARS template engine');
    server.engine("hbs", engine({
        extname: ".hbs",
        defaultLayout: "layout.hbs",
        layoutsDir: path.join( __dirname, './views/hbs/layouts'),
        partialsDir: path.join( __dirname, './views/hbs/partials')
    }))
    server.set('view engine', 'hbs')
}

server.set('views', path.join(__dirname, './views'))

server.use('/', express.static('public'));
server.use('/', productsRouter);

server.listen(port)
    .on('listening', () => console.log(`--> listening port ${port}`) )
    .on('request', (data) => console.log(`--> ${data.method} --> ${data.url}` ) )
    .on('error', (err) => console.log(`--> ${err}`) )