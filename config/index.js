require("dotenv").config();
const env = process.env;

const config = {
  dev: env.NODE_ENV !== "production",
  port: env.PORT,
  dbUser: env.DB_USER,
  dbPassword: env.DB_PASSWORD,
  dbName: env.DB_NAME,
};

module.exports = config;
