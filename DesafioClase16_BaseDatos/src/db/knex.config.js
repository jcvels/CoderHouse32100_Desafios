const products_data = {
    client:'mysql',
    connection:{
        host : 'uvcs01.uvcoding.com.ar',
        port : 3306,
        user : 'coderchallengesuser',
        password : 'dd6487010b1442c5099e54f42693200f',
        database : 'backendCoderDesafio16'
    }
}

const messages_data = {
    client: 'sqlite3',
    connection: {
      filename: '../db/messages.sqlite'
    }
}

module.exports = {
    products_data
}