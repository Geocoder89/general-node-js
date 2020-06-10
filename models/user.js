// instantiating the sequelize constructor
const Sequelize = require('sequelize');

// calling the sequelize object from the database
const sequelize = require('../util/database');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type:Sequelize.STRING,
        allowNull: false
    }
})


module.exports = User;