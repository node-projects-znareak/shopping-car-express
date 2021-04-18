require("dotenv").config();
const env = process.env;

const config = {
  dev: env.NODE_ENV !== "production",
  port: env.PORT,
  dbUser: env.DB_USER,
  dbPassword: env.DB_PASSWORD,
  dbName: env.DB_NAME,
  authAdminUsername: process.env.AUTH_ADMIN_USERNAME,
  authAdminPassword: process.env.AUTH_ADMIN_PASSWORD,
  authAdminEmail: process.env.AUTH_ADMIN_EMAIL,
  authJwtSecret: process.env.AUTH_JWT_SECRET,
};

module.exports = config;
