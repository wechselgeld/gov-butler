const {
	Client,
	CommandInteraction,
} = require('discord.js');
const consola = require('consola');

module.exports = {
	name: 'interactionCreate',

	/**
	 *
	 * @param {CommandInteraction} interaction "the interaction"
	 * @param {Client} client "the client"
	 */
	execute(interaction, client) {
		if (!(interaction.isCommand || interaction.isContextMenuCommand)) return;

		if (client.config.devBuild && !client.config.devAccess.includes(interaction.user.id)) {
			return interaction.reply({
				content: 'Diese Funktion ist nur den Entwicklern vorbehalten.',
				ephemeral: true,
			});
		}

		const command = client.commands.get(interaction.commandName);

		if (!command) return;

		try {
			command.execute(interaction, client);
		}
		catch (error) {
			consola.error(error);
			interaction.reply({
				content: 'Es trat ein Fehler beim Ausführen dieser Interaktion auf.',
				ephemeral: true,
			});
		}
	},
};