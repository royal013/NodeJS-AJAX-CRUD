const mysql = require('mysql');



var connection = mysql.createConnection({
    host: 'localhost',
    database: 'test',
    user: 'root',
    password: ''
})

connection.connect((err) => {
    if (err) {
        throw err;
    }
    else {
        console.log('database connection successful');
    }
})

module.exports = connection;