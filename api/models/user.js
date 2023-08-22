const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');
const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'USERS' // Especifica el nombre de la tabla en singular
});

module.exports = User;
