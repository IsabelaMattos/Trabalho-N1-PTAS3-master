const { Sequelize } = require('sequelize');
const config = require('../config/config')
require('dotenv').config();

const sequelize = new Sequelize( config.development );

try {
  sequelize.authenticate();
  console.log('Aplicação funcionando');
} catch (error) {
  console.error('Aplicação deu erro', error);
}

module.exports = { Sequelize, sequelize };