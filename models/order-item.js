const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const OrderItem = sequelize.define('orderItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  quantity: Sequelize.INTEGER
})


module.exports = OrderItem;


// nb a cart belongs to a single user but may contain multiple products
