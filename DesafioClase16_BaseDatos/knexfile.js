module.exports = {
  development: {
    client:'mysql',
    connection:{
        host : 'uvcs01.uvcoding.com.ar',
        port : 3306,
        user : 'coderchallengesuser',
        password : 'dd6487010b1442c5099e54f42693200f',
        database : 'backendCoderDesafio16'
    },
    migrations: {
      directory: 'src/db/migrations'
    }
  }
};
