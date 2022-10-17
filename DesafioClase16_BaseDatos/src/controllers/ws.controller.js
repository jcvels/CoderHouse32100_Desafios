const { Container } = require('../classes/container.class');
const { products_data, messages_data } = require('../../knexfile')

const products_db = new Container(products_data, 'products');
const messages_db = new Container(messages_data, 'messages');

const wsConnection = (socket, io) => {
    console.log(`--> WS --> new connection with id ${socket.id}`)

    products_db.getAll()
        .then( products => socket.emit('products-update', {products}) )
        .catch( error => console.error(error) )

    messages_db.getAll()
        .then( messages => socket.emit('messages-update', {messages}) )
        .catch( error => console.error(error) )

    socket.on("new-product", (data) => {
        products_db.addOne(data)
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

    socket.on("new-message", (data) => {
        messages_db.addOne(data)
            .then( data => {
                messages_db.getAll()
                    .then( messages => io.emit('messages-update', {messages}) )
                    .catch( error => console.error(error) )
            } )
            .catch( error => console.error(error) )
    })
}

module.exports = {
    wsConnection
}