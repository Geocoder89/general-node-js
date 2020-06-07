/**
 * set up using a purely mysql2 database
 */

// const mySql = require("mysql2");

// // creating a connection pool for mysql2

// const connectionPool = mySql.createPool({
//   host: "127.0.0.1",
//   user: "root",
//   database: "Products",
//   password: "Geocoder@89",
// });

// module.exports = connectionPool.promise();


/**
 * set up using sequelize package
 */

 const Sequelize = require('sequelize');

 const sequelize = new Sequelize('Node_complete','root','Geocoder@89',{
  dialect:'mysql',
  host: 'localhost'
 })

 module.exports = sequelize;
