const consola = require('consola');

const {
	loadFiles,
} = require('../functions/fileLoader');
const {
	Client,
} = require('discord.js');

/**
 *
 * @param {Client} client
 */
async function loadCommands(client) {
	await client.commands.clear();

	const commandArray = [];

	const files = await loadFiles('commands');

	files.forEach((file) => {
		const command = require(file);
		client.commands.set(command.data.name, command);

		commandArray.push(command.data.toJSON());
	});

	client.application.commands.set(commandArray);

	return consola.success('Successfully loaded command files.');
}

module.exports = {
	loadCommands,
};