const mysql = require('mysql');
require('dotenv').config()

const connexion = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'press',
    port     : '3306',
    insecureAuth : true

})

// connexion.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// }); 

module.exports = connexion;