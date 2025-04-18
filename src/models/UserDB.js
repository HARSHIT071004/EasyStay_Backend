var mysql = require('mysql2');

var pool = mysql.createPool({
    connectionLimit: 100,
    port: 3306,
    host:'localhost',
    user:'root',
    password:'123456',
    database:'homeaway',
    
});

module.exports = pool;