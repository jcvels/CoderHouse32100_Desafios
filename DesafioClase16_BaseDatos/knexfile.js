const products_data = {
    client:'mysql',
    connection:{
        host : process.env.db_mariadb_host,
        port : process.env.db_mariadb_port,
        user : process.env.db_mariadb_user,
        password : process.env.db_mariadb_password,
        database : process.env.db_mariadb_database,
    },
    migrations: {
        directory: 'src/db/migrations-mariadb'
    }
}

const messages_data = {
    client: 'sqlite3',
    connection: {
      filename: process.env.db_sqlite_filename
    },
    useNullAsDefault: true,
    migrations: {
        directory: 'src/db/migrations-sqlite'
    }
}

module.exports = {
    products_data,
    messages_data
}