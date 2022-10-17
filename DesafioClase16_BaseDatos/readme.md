# Desafío Clase 16: Nuestra Primera Base de Datos

## Ejecutar solución
- Acceder a la carpera del desafio: ```cd DesafioClase16_BaseDatos```.
- Validar el estado de las migraciones: ```npm run knex-list```.
- En caso de ser necesario, ejecutar las migraciones para crear las bases de datos y tablas: ```npm run knex-up```.
- Iniciar la aplicación: ```npm start```.
- Acceder a la vista: [localhost](http://localhost:8080).

## Consigna
1) Tomando como base las clases Contenedor en memoria y en archivos, desarrollar un nuevo contenedor con idénticos métodos pero que funcione sobre bases de datos, utilizando ```Knex``` para la conexión. Esta clase debe recibir en su constructor el objeto de configuración de Knex y el nombre de la tabla sobre la cual trabajará. Luego, modificar el desafío entregable de la clase 11 ”Chat con Websocket”, y:
    - cambiar la persistencia de los mensajes de filesystem a base de datos ```SQLite3```.
    - cambiar la persistencia de los productos de memoria a base de datos ```MariaDB```.

2) Desarrollar también un script que utilizando knex cree las tablas necesarias para la persistencia en cuestión (tabla mensajes en sqlite3 y tabla productos en mariaDb).

> Notas: Definir una carpeta DB para almacenar la base datos SQLite3 llamada ecommerce