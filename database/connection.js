const myConnection = require('express-myconnection');
const mysql = require('mysql');




connectDB = myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'puntoventa'
}, 'single');


module.exports = {
    connectDB
}