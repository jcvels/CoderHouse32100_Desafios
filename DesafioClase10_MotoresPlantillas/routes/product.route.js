const router = require('express').Router();
const { Contenedor, Producto} = require('../classes/products.class');

const products_db = new Contenedor('./data/products_db.json');

router.get('/', (req, res) => {
    res.render(`${process.argv[2]}/pages/products-form`);
});

router.get('/productos', (req, res) => {
    products_db.getAll()
        .then( products => res.render(`${process.argv[2]}/pages/products-list`, {products}) )
        .catch( error => res.status(500).render(`${process.argv[2]}/pages/error`, {error}) )
});

router.post('/productos', (req, res) => {
    let { title, price, thumbnail } = req.body;
    let new_product = new Producto( title, price, thumbnail )
    products_db.save(new_product)
        .then( data => res.redirect('/productos') )
        .catch( error => res.status(500).render(`${process.argv[2]}/pages/error`, {error}) )
});

// # solo para validar el funcionamiento de la página de error.
router.get('/error', (req, res) => {
    let error = 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.'
    res.status(500).render(`${process.argv[2]}/pages/error`, {error})
});

module.exports = router;