const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Event = sequelize.define("Event", {
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  date: DataTypes.DATE,
  year: DataTypes.STRING,
  image: DataTypes.STRING,
});

module.exports = Event;