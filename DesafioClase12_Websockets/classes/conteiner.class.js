const { writeFile, readFile } = require('fs/promises');
const { existsSync } = require('fs');

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
            return data_to_save
        }
        catch (error) {
            console.log(error);
        }

    }

    async updateById(id, data_to_save) {

        try {
            if( typeof data_to_save !== 'object' ) throw 'ERRROR: El elemento a guardar debe ser un objeto {...}';
            if( typeof id !== 'number' ) throw 'ERRROR: El ID debe ser un numero.';
            let file_content_raw = await readFile(this.fileName, {encoding:'utf-8'});
            let file_content = JSON.parse(file_content_raw);
            let item_to_modify_index = file_content.findIndex( item => item.id === id );

            if( item_to_modify_index === -1 ) return false

            file_content[item_to_modify_index] = data_to_save;
            await writeFile(this.fileName, JSON.stringify( file_content, null, 4 ) , {encoding:'utf-8'})
            return file_content[item_to_modify_index]
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
                await writeFile(this.fileName, JSON.stringify( file_content, null, 4 ) , {encoding:'utf-8'});
                return true;
            }
            return false;
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

module.exports = {
    Contenedor
};