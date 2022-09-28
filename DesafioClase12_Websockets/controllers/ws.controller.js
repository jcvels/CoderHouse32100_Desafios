const { Contenedor } = require('../classes/products.class');

const products_db = new Contenedor('./data/products_db.json');

const wsConnection = (socket, io) => {
    console.log(`--> new ws connection with id ${socket.id}`)
    
    products_db.getAll()
        .then( products => socket.emit('products-update', {products}) )
        .catch( error => console.error(error) )
        
    socket.on("new-product", (data) => {
        products_db.save(data)
            .then( data => {
                products_db.getAll()
                    .then( products => io.emit('products-update', {products}) )
                    .catch( error => console.error(error) )
            } )
            .catch( error => console.error(error) )
    })

    socket.on('delete-product', data => {
        products_db.deleteById(data)
            .then( data => {
                products_db.getAll()
                    .then( products => io.emit('products-update', {products}) )
                    .catch( error => console.error(error) )
            } )
            .catch( error => console.error(error) )        
    })
    
}

module.exports = {
    wsConnection
}