```js
    use ecommerce
    db.createCollection('products')
    db.products.insertMany([
        { "title": "Apple Mac Mini M1", "price": 100, "thumbnail": "https://cdn4.iconfinder.com/data/icons/iconize-apple-devices-freebies/128/apple-07-256.png" },
        { "title": "Apple Macbook Pro M1", "price": 200, "thumbnail": "https://cdn4.iconfinder.com/data/icons/iconize-apple-devices-freebies/128/apple-08-256.png" },
        { "title": "Apple Watch 3", "price": 300, "thumbnail": "https://cdn4.iconfinder.com/data/icons/iconize-apple-devices-freebies/128/apple-04-256.png" },
        { "title": "Apple TV", "price": 900, "thumbnail": "https://cdn4.iconfinder.com/data/icons/iconize-apple-devices-freebies/128/apple-03-256.png" },
        { "title": "Apple iMac 24\" M1", "price": 1000, "thumbnail": "https://cdn4.iconfinder.com/data/icons/iconize-apple-devices-freebies/128/apple-01-256.png" },
        { "title": "Apple Mac Mini M1", "price": 1200, "thumbnail": "https://cdn4.iconfinder.com/data/icons/iconize-apple-devices-freebies/128/apple-07-256.png" },
        { "title": "Apple Macbook Pro M1 -v2", "price": 1500, "thumbnail": "https://cdn4.iconfinder.com/data/icons/iconize-apple-devices-freebies/128/apple-08-256.png" },
        { "title": "Apple Watch 3 -v2", "price": 2000, "thumbnail": "https://cdn4.iconfinder.com/data/icons/iconize-apple-devices-freebies/128/apple-04-256.png" },
        { "title": "Apple TV -v2","price": 3000, "thumbnail": "https://cdn4.iconfinder.com/data/icons/iconize-apple-devices-freebies/128/apple-03-256.png" },
        { "title": "Apple iMac 24\" M1 -v2", "price": 4500, "thumbnail": "https://cdn4.iconfinder.com/data/icons/iconize-apple-devices-freebies/128/apple-01-256.png" }
    ])
    db.createCollection('messages')
    db.messages.insertMany([
        { "mail": "cliente@demo.com", "text": "Hola! Por favor, indicarme si el Apple Watch 3 es de 38 o 42 milímetros.", "timestamp": "03/08/2022 18:46:02" },
        { "mail": "admin@tienda.com", "text": "Hola, el modelo que tenemos en stock es de 38mm. La próxima semana, tendremos stock en 42mm. ", "timestamp": "03/08/2022  8:47:39" },
        { "mail": "cliente@demo.com", "text": "Genial! Entonces, vuelvo a consultar la próxima semana! Muchas gracias!", "timestamp": "03/08/2022 18:48:23" },
        { "mail": "admin@tienda.com", "text": "Te esperamos! Saludos", "timestamp": "03/08/2022 18:48:44" },
        { "mail": "cliente2@tienda.com", "text": "Hola, necesito hacer un cambio...", "timestamp": "04/08/2022 18:48:44" },
        { "mail": "admin@tienda.com", "text": "Hola, cuando hiciste la compra?", "timestamp": "04/08/2022 18:49:44" },
        { "mail": "cliente2@tienda.com", "text": "Ayer, ya me llegó pero estaba mal el talle. Quiero un talle mas.", "timestamp": "04/08/2022 19:50:44" },
        { "mail": "admin@tienda.com", "text": "Perfecto, envianos un correo a info@tienda.com con la copia de la factura y te indicamos como seguir.", "timestamp": "04/08/2022 18:51:44" },
        { "mail": "cliente2@tienda.com", "text": "Perfecto, muchas gracias!", "timestamp": "04/08/2022 18:52:44" },
        { "mail": "admin@tienda.com", "text": "Esperamos tu correo! Saludos", "timestamp": "04/08/2022 18:53:44" }
    ])
    db.products.find()
    db.messages.find()
    db.products.estimatedDocumentCount()
    db.messages.estimatedDocumentCount()
    db.products.insertOne({ "title": "Producto Agregado", "price": "4999", "thumbnail": "https://cdn4.iconfinder.com/data/icons/iconize-apple-devices-freebies/128/apple-07-256.png" })
    db.products.findOne({'title':'Producto Agregado'})
    db.products.find({'price':{$lt:1000}})
    db.products.find({$and:[{'price':{$gt:1000}},{'price':{$lt:3000}}]})
    db.products.find({'price':{$gt:3000}})
    db.products.updateMany({},{$set:{'stock':100}})
    db.products.updateMany({'price':{$gt:4000}},{$set:{'stock':0}})
    db.products.deleteMany({'price':{$lt:1000}})
    db.createUser({user: "pepe",pwd: "asd456",roles: [{ role: "read", db: "ecommerce" }]})
```