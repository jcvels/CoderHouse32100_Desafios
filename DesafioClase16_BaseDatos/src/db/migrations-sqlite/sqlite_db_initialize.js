const up = async (knex) => {
    const hasTable = await knex.schema.hasTable('messages')
    if(!hasTable)
        return knex.schema
            .createTable('messages', (table) => {
                table.increments('id');
                table.string('mail').notNullable();
                table.string('text').notNullable();
                table.string('timestamp').notNullable();
            })
};

const down = async (knex) => {
    if( await knex.schema.hasTable('messages') ) return knex.schema.dropTable('messages')
};

module.exports = {
    up,
    down
}