const router = require('express').Router();
const { no_products, product_not_found, product_deleted } = require('../data/messages');
const { Contenedor, Producto} = require('../classes/products.class');

const products_db = new Contenedor('./data/products_db.json');

router.get('/', (req, res) => {
    products_db.getAll()
        .then( data => {
            if( data.length > 0 ) res.status(200).json(data)
            else res.status(200).json(no_products)
            // Mantengo el estado 200 para que se pueda ver el mensaje de error solicitado en el ejercicio. 
        } )
        .catch( err => res.status(500).send(err) )
});

router.get('/:id', (req, res) => {
    products_db.getById( Number.parseInt( req.params.id ) )
        .then( data => {
            if( data !== null ) res.status(200).json(data)
            else res.status(200).json(product_not_found)
            // Mantengo el estado 200 para que se pueda ver el mensaje de error solicitado en el ejercicio. 
        } )
        .catch( err => res.status(500).send(err) )
});

router.post('/', (req, res) => {
    let { title, price, thumbnail } = req.body;
    let new_product = new Producto( title, price, thumbnail )
    products_db.save(new_product)
        .then(data => res.status(201).json( data ) )
        .catch( err => res.status(500).send(err) )
});

router.put('/:id', (req, res) => {
    let { title, price, thumbnail } = req.body;
    let updated_product_data = new Producto( title, price, thumbnail, Number.parseInt( req.params.id ) )
    products_db.updateById( Number.parseInt( req.params.id ), updated_product_data )
        .then(data => {
            if( data !== false ) res.status(200).json( data )
            else res.status(200).json(product_not_found)
            // Mantengo el estado 200 para que se pueda ver el mensaje de error solicitado en el ejercicio. 
        })
        .catch( err => res.status(500).send( err ) )
});

router.delete('/:id', (req, res) => {
    products_db.deleteById( Number.parseInt( req.params.id ) )
        .then( data => {
            if(data === true) res.status(200).json( product_deleted )
            else res.status(200).json( product_not_found )
        })
        .catch( err => res.status(500).send(err) )
});

module.exports = router;