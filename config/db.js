const config = require('./config');
const {Sequelize, DataTypes, Model, Op} = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.url, dbConfig.options);

const db = {
  sequelize: sequelize,
  Sequelize: Sequelize,
  DataTypes: DataTypes,
  Model: Model,
  Op: Op,
};

module.exports = db;
