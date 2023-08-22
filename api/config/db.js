const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("joaquinc_notes", "joaquinc_localhost", "joakpo98", {
host: "138.201.26.147",
dialect: "mysql",
});

module.exports = sequelize;