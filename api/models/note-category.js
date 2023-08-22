const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const NoteCategory = sequelize.define('NoteCategory', {});

module.exports = NoteCategory;