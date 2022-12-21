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
async function loadButtons(client) {
	await client.buttons.clear();

	const files = await loadFiles('buttons');

	files.forEach((file) => {
		const button = require(file);
		client.buttons.set(button.id, button);
	});

	return consola.success('Successfully loaded button files.');
}

module.exports = {
	loadButtons,
};