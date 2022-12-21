const {
	EmbedBuilder,
} = require('discord.js');

module.exports = {
	id: 'example',

	async execute(interaction, client, arguments) {
		const target = arguments[0];
		interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setTitle('Example button response')
					.setDescription(`Hey you clicked the example button! The user you @'d in the example command was <@${target}>`)
					.setColor('Blue'),
			],
			ephemeral: true,
		});
	},
};