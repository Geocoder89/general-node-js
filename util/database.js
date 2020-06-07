// set up using purely mysql2
const mySql = require("mysql2");

// creating a connection pool for mysql2

const connectionPool = mySql.createPool({
  host: "127.0.0.1",
  user: "root",
  database: "Products",
  password: "Geocoder@89",
});

module.exports = connectionPool.promise();
