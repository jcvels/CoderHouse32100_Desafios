const { writeFile, readFile } = require('fs/promises');
const { existsSync } = require('fs');
const { table } = require('console');

class Producto {

    constructor(title,price,thumbnail) {
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }

}

class Contenedor {

    constructor(fileName) {
        this.fileName = fileName;
        this.createEmpty();
    }

    async createEmpty() {

        try {
            if( ! existsSync(this.fileName) )
                await writeFile(this.fileName, JSON.stringify([], null, 4), {encoding:'utf-8'});
        }
        catch (error) {
            console.log(error);
        }

    }
 
    async save(data_to_save) {

       try {
            if( typeof data_to_save !== 'object' ) throw 'ERRROR: El elemento a guardar debe ser un objeto {...}';
            let file_content_raw = await readFile(this.fileName, {encoding:'utf-8'});
            let file_content = JSON.parse(file_content_raw);
            data_to_save.id = file_content.length === 0 ? 1 : file_content[ file_content.length -1 ].id + 1
            file_content.push( data_to_save );
            await writeFile(this.fileName, JSON.stringify( file_content, null, 4 ) , {encoding:'utf-8'})
        }
        catch (error) {
            console.log(error);
        }

    }

    async getById(id) {

        try {
            if( typeof id !== 'number' ) throw 'ERRROR: El ID debe ser un numero.';
            let file_content_raw = await readFile(this.fileName, {encoding:'utf-8'});
            let file_content = JSON.parse(file_content_raw);
            let response = file_content.find( item => item.id === id );
            response = response === undefined ? response = null : response;
            console.log( '--> respuesta de getById()', response );
            return response;
        }
        catch (error) {
            console.log(error);
        }

    }

    async getAll() {

        try {
            let file_content_raw = await readFile(this.fileName, {encoding:'utf-8'});
            let file_content = JSON.parse(file_content_raw);
            console.log( '--> respuesta de getAll()', file_content );
            return file_content;
        }
        catch (error) {
            console.log(error);
        }

    }

    async deleteById(id) {

        try {
            if( typeof id !== 'number' ) throw 'ERRROR: El ID debe ser un numero.';
            let file_content_raw = await readFile(this.fileName, {encoding:'utf-8'});
            let file_content = JSON.parse(file_content_raw);
            let index = file_content.findIndex( item => item.id === id );
            if(index !== -1) {
                file_content.splice(index,1); console.log(index)
                await writeFile(this.fileName, JSON.stringify( file_content, null, 4 ) , {encoding:'utf-8'})
            }
            console.log( '--> respuesta de deleteById()', file_content );
        }
        catch (error) {
            console.log(error);
        }

    }

    async deleteAll() {

        try {
            await writeFile(this.fileName, JSON.stringify([], null, 4), {encoding:'utf-8'});
        }
        catch (error) {
            console.log(error);
        }

    }

}

console.log('--> creamos un contenedor llamado "productos.txt"');
ejemplo_contenedor = new Contenedor('productos.txt');

// console.log('--> intentamos guardar un tipo de dato que no sea "object"');
// ejemplo_contenedor.save( 'data de tipo strign' )

console.log('--> creamos datos de prueba');
let product_1 = new Producto('Producto de prueba 001',1001,'https://dummyimage.com/200x200/000000/fff.jpg&text=1');
ejemplo_contenedor.save(product_1);

// let product_2 = new Producto('Producto de prueba 002',2002,'https://dummyimage.com/200x200/000000/fff.jpg&text=2');
// ejemplo_contenedor.save(product_2);

// console.log('--> consultamos por el producto con id=2');
// ejemplo_contenedor.getById(2);

// console.log('--> consultamos por el producto con id=2000');
// ejemplo_contenedor.getById(2000);

// console.log('--> consultamos por todos los productos');
// ejemplo_contenedor.getAll();

// console.log('--> eliminamos el producto con id=5');
// ejemplo_contenedor.deleteById(5);

// console.log('--> eliminamos todo el contenido');
// ejemplo_contenedor.deleteAll();