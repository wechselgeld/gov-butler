const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'user', process.env.DB_TOKEN, {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'government.sqlite',
});

const activity = sequelize.define('activity', {
	discordId: {
		type: Sequelize.STRING,
		primaryKey: true,
		defaultValue: 0,
		allowNull: false,
	},

	timestamp: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
});

const users = sequelize.define('users', {
	discordId: {
		type: Sequelize.STRING,
		primaryKey: true,
		defaultValue: 0,
		allowNull: false,
	},

	serviceNumber: {
		type: Sequelize.STRING,
		defaultValue: 'Nicht angegeben',
	},

	firstName: {
		type: Sequelize.STRING,
		defaultValue: 'Nicht angegeben',
	},

	lastName: {
		type: Sequelize.STRING,
		defaultValue: 'Nicht angegeben',
	},

	rank: {
		type: Sequelize.STRING,
		defaultValue: 0,
	},

	rankType: {
		type: Sequelize.STRING,
		defaultValue: 'Nicht angegeben',
	},

	activityType: {
		type: Sequelize.STRING,
		defaultValue: 'offline',
	},

	activity: {
		type: Sequelize.INTEGER,
		defaultValue: 100,
	},

	lastActivity: {
		type: Sequelize.INTEGER,
		defaultValue: 100,
	},

	lifetimeActivity: {
		type: Sequelize.INTEGER,
		defaultValue: 100,
	},

	punishmentPoints: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
	},
});

exports.activity = activity;
exports.users = users;
exports.sequelize = sequelize;
