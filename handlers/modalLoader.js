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
async function loadModals(client) {
	await client.modals.clear();

	const files = await loadFiles('modals');

	files.forEach((file) => {
		const modal = require(file);
		client.modals.set(modal.id, modal);
	});

	return consola.success('Successfully loaded modal files.');
}

module.exports = {
	loadModals,
};