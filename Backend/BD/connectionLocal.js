var mysql = require('mysql');

var connection = mysql.createConnection({
   host: 'ec2-3-86-211-81.compute-1.amazonaws.com',//'localhost'
   user: 'root',
   password: '12345678',
   database: 'semi1PR2',//'semi1'1
   port: 3306
});

connection.connect(function(error){
   if(error){
      throw error;
   }else{
      console.log('Conexion correcta.');
   }
});
module.exports = connection;