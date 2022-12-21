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
async function loadEvents(client) {
	await client.events.clear();

	const files = await loadFiles('events');
	files.forEach((file) => {
		const event = require(file);
		const execute = (...arguments) => event.execute(...arguments, client);

		client.events.set(event.name, execute);

		if (event.rest) {
			if (event.once) {
				client.rest.once(event.name, execute);
			}
			else {
				client.rest.on(event.name, execute);
			}
		}
		else if (event.once) {
			client.once(event.name, execute);
		}
		else {
			client.on(event.name, execute);
		}
	});

	return consola.success('Successfully loaded event files.');
}

module.exports = {
	loadEvents,
};