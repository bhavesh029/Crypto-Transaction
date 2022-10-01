const Sequelize = require('sequelize');

const sequelize = require('../Util/db');

const user = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    address: {
        type: Sequelize.STRING
    },
    etherum: {
        type: Sequelize.STRING
    },
    balance:{
        type: Sequelize.STRING
    }    
});

module.exports = user;