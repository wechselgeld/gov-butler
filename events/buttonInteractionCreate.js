const {
	ButtonInteraction,
	Client,
} = require('discord.js');

module.exports = {
	name: 'interactionCreate',

	/**
	 *
	 * @param {ButtonInteraction} interaction
	 * @param {Client} client
	 */
	async execute(interaction, client) {
		if (!interaction.isButton()) return;

		const customId = interaction.customId.split('@');
		const button = client.buttons.get(customId[0]);

		if (!button) return;

		if (client.config.devBuild && !client.config.devAccess.includes(interaction.user.id)) {
			return interaction.reply({
				content: 'Diese Funktion ist nur den Entwicklern vorbehalten.',
				ephemeral: true,
			});
		}

		button.execute(interaction, client, customId.slice(1));
	},
};