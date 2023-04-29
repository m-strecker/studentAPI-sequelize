//Import sequelize model
const Sequelize = require("sequelize");

//Create an instance of sequelize
const sequelize = new Sequelize("student_api", "robo", "123456", {dialect: "mysql"});

//Export sequelize object to be used in other modules
module.exports = sequelize;