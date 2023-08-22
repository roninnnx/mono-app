// category.js (modelo de categoría)
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Importa la instancia de sequelize

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: 'CATEGORIES' // Especifica el nombre de la tabla en singular
});

module.exports = Category; // Asegúrate de exportar solo la definición del modelo
