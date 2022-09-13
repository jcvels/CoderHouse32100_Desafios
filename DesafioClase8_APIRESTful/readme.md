# Desafío Clase 8: API RESTful

## Ejecutar resolución
- `cd DesafioClase8_APIRESTful`
- `node index.js`
- Navegar a `localhost:8080` para utilizar el formulario de carga de productos.
- Utilizar `postman_collection.json` para pruebas desde `Postman`.

## Requerimientos
- Realizar un proyecto de servidor basado en node.js y express que ofrezca una API RESTful de productos. En detalle, que incorpore las siguientes rutas:
    - [X] GET `/api/productos` -> devuelve todos los productos.
    - [X] GET `/api/productos/:id` -> devuelve un producto según su id.
    - [X] POST `/api/productos` -> recibe y agrega un producto, y lo devuelve con su id asignado.
    - [X] PUT `/api/productos/:id` -> recibe y actualiza un producto según su id.
    - [X] DELETE `/api/productos/:id` -> elimina un producto según su id.

- [X] Cada producto estará representado por un objeto con el siguiente formato:

```js
    {
        title: (nombre del producto),
        price: (precio),
        thumbnail: (url al logo o foto del producto)
    }
```

- [X] Cada ítem almacenado dispondrá de un id numérico proporcionado por el backend, comenzando en 1, y que se irá incrementando a medida de que se incorporen productos. Ese id será utilizado para identificar un producto que va a ser listado en forma individual.

- [X] Para el caso de que un producto no exista, se devolverá el objeto: 

```js
    {
        error : 'producto no encontrado'
    }
```

- [X] Implementar la API en una clase separada, utilizando un array como soporte de persistencia en memoria.

- [X] Incorporar el Router de express en la url base `/api/productos` y configurar todas las subrutas en base a este.

- [X] Crear un espacio público de servidor que contenga un documento index.html con un formulario de ingreso de productos con los datos apropiados.

- [X] El servidor debe estar basado en express y debe implementar los mensajes de conexión al puerto 8080 y en caso de error, representar la descripción del mismo.

- [X] Las respuestas del servidor serán en formato JSON. La funcionalidad será probada a través de Postman y del formulario de ingreso.