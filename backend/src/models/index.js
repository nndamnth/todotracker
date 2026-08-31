"use strict";

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(path.resolve(__dirname, '..', '..', 'config', 'config.json'))[env];
// Ensure sqlite storage path is absolute so migrations and runtime use same file
if (config && config.dialect === 'sqlite' && config.storage) {
  // Do not resolve special in-memory storage. Only convert relative file paths to absolute
  if (config.storage !== ':memory:' && !path.isAbsolute(config.storage)) {
    config.storage = path.resolve(__dirname, '..', '..', config.storage);
  }
}
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config);
}

fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
