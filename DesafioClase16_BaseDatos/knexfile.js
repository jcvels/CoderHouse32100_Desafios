const products_data = {
    client:'mysql',
    connection:{
        host : 'uvcs01.uvcoding.com.ar',
        port : 3306,
        user : 'coderchallengesuser',
        password : 'dd6487010b1442c5099e54f42693200f',
        database : 'backendCoderDesafio16'
    },
    migrations: {
        directory: 'src/db/migrations-mariadb'
    }
}

const messages_data = {
    client: 'sqlite3',
    connection: {
      filename: 'src/db/backendCoderDesafio16.sqlite'
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