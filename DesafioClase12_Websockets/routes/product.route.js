const router = require('express').Router();

router.get('/', (req, res) => {
    res.render(`pages/main`);
});

// router.post('/productos', (req, res) => {
//     let { title, price, thumbnail } = req.body;
//     let new_product = new Producto( title, price, thumbnail )
//     products_db.save(new_product)
//         .then( data => res.redirect('/productos') )
//         .catch( error => res.status(500).render(`/pages/error`, {error}) )
// });

module.exports = router;