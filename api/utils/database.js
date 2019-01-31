const Sequelize = require('sequelize');

const DB_HOST=process.env.DB_HOST;
const DB_USER=process.env.DB_USER;
const DB_PASSWORD=process.env.DB_PASSWORD;
const DB_SCHEMA=process.env.DB_SHEMA;
const DB_DIALECT=process.env.DB_DIALECT;
const DB_LOGS = process.env.DB_LOGS;


const sequelize = new Sequelize(DB_SCHEMA, {
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASSWORD,
    dialect: DB_DIALECT,
    logging: DB_LOGS
})
module.exports = sequelize;