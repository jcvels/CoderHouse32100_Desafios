class Container {
    
    constructor(knex_config, table_name) {
        this.table_name = table_name
        this.database = require('knex')(knex_config)
        this.initDB()
    }

    async initDB() {
        if( ! await this.database.schema.hasTable(this.table_name) ) {
            console.error(`\n--> ERROR --> ${this.table_name} table does not exist.`)
            console.error('--> ERROR --> run the command "npm run knex-up" before start the app.\n')
            process.exit(-1)
        }
    }

    async getAll() {
        try {
            const data = await this.database.select().from(this.table_name)
            return data;
        }
        catch (error) { 
            console.error('--> ERROR -->', error)
            throw error
        }
    }
    
    async getById(id) {
        try {
            const data = await this.database.select().where('id', id).from(this.table_name)
            return data;
        }
        catch (error) { 
            console.error('--> ERROR -->', error)
            throw error
        }
    }

    async addOne(data) {
        try {
            const response = await this.database(this.table_name).insert(data)
            return response
        }
        catch (error) {
            console.error('--> ERROR -->', error)
            throw error
        }
    }

    async deleteById(id) {
        try {
            const response = await this.database(this.table_name).where('id', id).del()
            return response
        }
        catch (error) {
            console.error('--> ERROR -->', error)
            throw error
        }
    }

}

module.exports = {
    Container
};