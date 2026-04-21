const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Registration = sequelize.define("Registration", {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  eventId: DataTypes.INTEGER,
});

module.exports = Registration;