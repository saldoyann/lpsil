const Sequelize = require('sequelize');
const sequelize = new Sequelize('store_mandarine', 'root', '', {
	dialect: 'mysql',
	host: 'localhost',
	
})

module.exports = sequelize;