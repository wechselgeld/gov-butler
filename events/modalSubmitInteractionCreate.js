const {
	ModalSubmitInteraction,
} = require('discord.js');

module.exports = {
	name: 'interactionCreate',

	/**
	 *
	 * @param { ModalSubmitInteraction } interaction
	 * @param {*} client
	 */
	async execute(interaction, client) {
		if (!interaction.isModalSubmit()) return;

		if (client.config.devBuild && !client.config.devAccess.includes(interaction.user.id)) {
			return interaction.reply({
				content: 'Diese Funktion ist nur den Entwicklern vorbehalten.',
				ephemeral: true,
			});
		}

		const customId = interaction.customId.split('@');
		const modal = client.modals.get(customId[0]);

		try {
			modal.execute(interaction, client, customId.slice(1));
		}
		catch (error) {
			console.error(error);
		}
	},
};