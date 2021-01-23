const env = {
    database : 'dhmsdb',
    username : 'dhms',
    password : '123qwe4r',
    host     : 'localhost',
    dialect  : 'postgres',
   
    pool: {
        max : 5,
        min : 0,
        acquire : 30000,
        idle : 10000
    }
}

module.exports = env