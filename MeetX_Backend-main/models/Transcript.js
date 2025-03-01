const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnect'); // Adjust the path as necessary

const Transcript = sequelize.define('Transcript', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    }
},{timestamps: true});

module.exports = Transcript;