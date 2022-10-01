const Sequelize = require('sequelize');

const sequelize = require('../Util/db');

const transactions = sequelize.define('transactions', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    blockNumber:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    timeStamp:{
        type: Sequelize.STRING
    },
    hash:{
        type: Sequelize.STRING
    },
    from:{
        type: Sequelize.STRING
    },
    to: {
        type: Sequelize.STRING
    },
    value:{
        type: Sequelize.STRING
    }
    
});

module.exports = transactions;