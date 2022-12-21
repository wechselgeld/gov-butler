const {
	EmbedBuilder,
	ModalBuilder,
	ActionRowBuilder,
	TextInputStyle,
	TextInputBuilder,
} = require('discord.js');

module.exports = {
	id: 'ban-modal',
	builder: new ModalBuilder()
		.setTitle('Erstelle ein Ticket')
		.addComponents(
			new ActionRowBuilder().addComponents(
				new TextInputBuilder()
					.setCustomId('reason')
					.setRequired(true)
					.setLabel('Grund')
					.setStyle(TextInputStyle.Short)
					.setPlaceholder('z. B. "Felix", ohne die Anführungszeichen'),
			)),

	async execute(interaction, client, arguments) { // To access an id / value from a button you MUST INCLUDE `client` AND `args` and in the same order as shown
		const target = arguments[0]; // Accessing the id that was passed into the button
		const favoriteColor = interaction.fields.getTextInputValue('reason');

		interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setTitle('Example modal')
					.setDescription(`Hey you clicked the example button! The user you @'d in the example command was <@${target}>, ${favoriteColor}`)
					.setColor('Blue'),
			],
			ephemeral: true,
		});
	},
};