const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "Ictdb",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database Connected");

    await sequelize.sync();
    console.log("✅ Tables synced");
  } catch (err) {
    console.log("❌ DB ERROR:", err.message);
  }
};

module.exports = { sequelize, connectDB, DataTypes };