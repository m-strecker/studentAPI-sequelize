//Import sequelize model
const Sequelize = require('sequelize');
//Import instance of sequelize model from config file
const sequelize = require('./../configuration/config');





//Create a constant called student to store the defined sequelize model
const student = sequelize.define('student', {
    id:{
    type: Sequelize.INTEGER,
    autoIncrement: true, 
    allowNull: false,
    primaryKey: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    section:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    gpa:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    nationality:{
        type: Sequelize.STRING,
        allowNull: false
    }

});


















//Export model
module.exports = student;