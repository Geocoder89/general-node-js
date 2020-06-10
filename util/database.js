/**
 * set up using sequelize package
 */
const Sequelize = require('sequelize')

const sequelize = new Sequelize('Node_complete','root','Geocoder@89',{
 dialect:'mysql',
 host: 'localhost'
})

module.exports = sequelize;
