var sequelize = require('../base.js');
const Sequelize = require('sequelize');

const User = sequelize.define('user', {
	nom: Sequelize.STRING,
	prenom: Sequelize.STRING,
	mdp: Sequelize.STRING,
	email: Sequelize.STRING
}
, {
  tableName : 'user',
  createdAt : 'sys_created',
  updatedAt : 'sys_modified',
  deletedAt : false,
  freezeTableName: true
});

User.sync();

module.exports = User;