require("dotenv").config();

const isProduction = process.env.NODE_ENV === 'production';

const commonConfig = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD || process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  dialect: "mysql",
  logging: false,
  // Solo aplicamos SSL si NODE_ENV es 'production'
  dialectOptions: isProduction ? {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  } : {}
};

module.exports = {
  development: {
    ...commonConfig,
    // En local usualmente no queremos SSL
    dialectOptions: {}
  },
  test: commonConfig,
  production: commonConfig
};
