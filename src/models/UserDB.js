var mysql = require('mysql2');

var pool = mysql.createPool({
    connectionLimit: 100,
    port: 3306,
    host:'sql12.freesqldatabase.com',
    user:'sql12774041',
    password:'JlAW99amN1',
    database:'sql12774041',
    
});

module.exports = pool;