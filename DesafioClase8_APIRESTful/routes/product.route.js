const router = require('express').Router();
const { no_products, product_not_found } = require('../data/messages');
const { Contenedor, Producto} = require('../classes/products.class');

const products_db = new Contenedor('./data/products_db.json');

router.get('/', (req, res) => {
    products_db.getAll()
        .then( data => {
            if( data.length > 0 ) res.status(200).json(data)
            else res.status(200).json(no_products) // Manengo el estado 200 para que se pueda ver el mensaje de error solicitado en el ejercicio. 
        } )
        .catch( err => res.status(500).send(err) )
});

router.get('/:id', (req, res) => {
    products_db.getById( Number.parseInt( req.params.id ) )
        .then( data => {
            if( data !== null ) res.status(200).json(data)
            else res.status(200).json(product_not_found) // Manengo el estado 200 para que se pueda ver el mensaje de error solicitado en el ejercicio. 
        } )
        .catch( err => res.status(500).send(err) )
});

router.post('/', (req, res) => {
    let { title, price, thumbnail } = req.body;
    let new_product = new Producto( title, price, thumbnail )
    products_db.save(new_product)
        .then(id => res.status(200).json( {id} ) )
        .catch( err => res.status(500).send(err) )
});

router.put('/:id', (req, res) => res.send('recibe y actualiza un producto según su id'));

router.delete('/:id', (req, res) => res.send('elimina un producto según su id'));

module.exports = router;