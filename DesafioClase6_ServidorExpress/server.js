const express = require('express');
const { Contenedor, Producto } = require('./products');

const products_db = new Contenedor('products_db.json');
const port = 8080;

const server = express();
const router = express.Router();

const home_menu = require('./home_menu');

router.get('/', (req,res) => res.send(home_menu) )

router.get('/add', (req, res) => {
    let random_number = Number.parseInt(Math.random() * (100 - 10) + 10)
    let temp_product = new Producto(`Producto de prueba #${random_number}`, random_number, `https://dummyimage.com/200x200/000000/fff.jpg&text=${random_number}`);
    products_db.save(temp_product)
        .then( id => res.send(`Se creo un producto dummy con id = ${id}.`) )
        .catch( err => res.send(`Error al crear producto: ${err}.`) );
});

router.get('/clear', (req, res) => {
    products_db.deleteAll()
        .then( () => res.send(`Se eliminaron los productos.`) )
        .catch( err => res.send(`Error al eleminar los productos: ${err}.`) );
});

router.get('/productos', (req,res) => {
    products_db.getAll()
        .then( data => res.send(data) )
        .catch( err => res.send(err) );
});

router.get('/productoRandom', (req,res) => {
    products_db.getAll()
        .then( data => {
            let random_index = Number.parseInt(Math.random() * (data.length - 0));
            res.send( data[random_index] );
        })
        .catch( err => res.send(err) );   
});

server.use( router );

server.listen(port)
    .on('listening', () => console.log(`Server listo escuchando puerto ${port}`) )
    .on('request', (data) => console.log('Nueva consulta a "', data.url, '" usando el metodo', data.method) )