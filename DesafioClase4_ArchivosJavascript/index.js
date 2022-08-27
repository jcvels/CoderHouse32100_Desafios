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
            return data_to_save.id
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
                file_content.splice(index,1);
                await writeFile(this.fileName, JSON.stringify( file_content, null, 4 ) , {encoding:'utf-8'})
            }
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

const runTests = async () => {

    console.log('--> creamos un contenedor llamado "productos.json"');
    ejemplo_contenedor = new Contenedor('productos.json');

    console.log('\n--> intentamos guardar un tipo de dato que no sea "object"');
    await ejemplo_contenedor.save( 'data de tipo strign' )

    console.log('\n--> creamos 10 datos de prueba');
    for (let index = 0; index < 10; index++) {
        let product = new Producto(`Producto de prueba ${ index + 1000 }`,1001,'https://dummyimage.com/200x200/000000/fff.jpg&text=1');
        console.log('--> id del nuevo elemento', await ejemplo_contenedor.save(product));
    }

    console.log('\n--> consultamos por el producto con id=2');
    let response = await ejemplo_contenedor.getById(2);
    console.log( '--> respuesta de getById(2)', response );
    
    console.log('\n--> consultamos por el producto con id=2000 que no existe');
    response = await ejemplo_contenedor.getById(2000);
    console.log( '--> respuesta de getById(2000)', response );

    console.log('\n--> consultamos por todos los productos');
    response = await ejemplo_contenedor.getAll();
    console.log( '--> respuesta de getAll()', response );

    console.log('\n--> eliminamos el producto con id=5');
    await ejemplo_contenedor.deleteById(5);
    console.log('--> consultamos por todos los productos donde se observa el id=5 eliminado');
    response = await ejemplo_contenedor.getAll();
    console.log( '--> respuesta de getAll()', response );

    console.log('\n--> eliminamos todo el contenido');
    await ejemplo_contenedor.deleteAll();
    console.log('--> consultamos por todos los productos donde se observa que se han eliminado todos los objetos');
    response = await ejemplo_contenedor.getAll();
    console.log( '--> respuesta de getAll()', response );

}

runTests();