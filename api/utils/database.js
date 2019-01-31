const Sequelize = require('sequelize');

const DB_HOST=process.env.DB_HOST;
const DB_USER=process.env.DB_USER;
const DB_PASSWORD=process.env.DB_PASSWORD;
const DB_SCHEMA=process.env.DB_SCHEMA;
const DB_DIALECT=process.env.DB_DIALECT;
const DB_LOGS = process.env.DB_LOGS;

const sequelize = new Sequelize(DB_SCHEMA,DB_USER, DB_PASSWORD,{
    host: DB_HOST,
    dialect: DB_DIALECT,
    logging: console.log
})
module.exports = sequelize;