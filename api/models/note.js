const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Importa la instancia de sequelize
const NoteCategory = require('./note-category');
const Category = require('./category');

const Note = sequelize.define('Note', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    archived: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
},{
    tableName: 'NOTES' // Especifica el nombre de la tabla en singular
});

Note.prototype.setCategories = async function (categoryIds) {

    // Verificar si los IDs de categoría son válidos
    const validCategoryIds = [];
    console.log("TODOS LOS CATEGORY IDS ", categoryIds)
    for (const categoryId of categoryIds) {
        console.log("EL CATEGORY ID INDIVIDUAL ", categoryId.dataValues.id)
        const id=  categoryId.dataValues.id;
        const category = await Category.findByPk(id);
        if (category) {
            validCategoryIds.push(id);
        }
    }

    // Clear existing associations
    await NoteCategory.destroy({
        where: { NoteId: this.id }
    });

    // Create new associations
    for (const categoryId of validCategoryIds) {
        console.log("VOY A CREAR CATEGORIA PARA ",categoryId)
        await NoteCategory.create({
            NoteId: this.id,
            CategoryId: categoryId
        });
    }
};

const User = require('./user');

Note.belongsTo(User, { foreignKey: 'UserId' });

module.exports = Note;