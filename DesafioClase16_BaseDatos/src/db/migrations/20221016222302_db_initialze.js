const up = async (knex) => {
    const hasTable = await knex.schema.hasTable('products')
    if(!hasTable)
        return knex.schema
            .createTable('products', (table) => {
                table.increments('id');
                table.string('title').notNullable();
                table.string('thumbnail').notNullable();
                table.decimal('price').notNullable();
            })
};

const down = async (knex) => {
    if( await knex.schema.hasTable('products') ) return knex.schema.dropTable('products')
};

module.exports = {
    up,
    down
}