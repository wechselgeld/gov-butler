const {
	ChatInputCommandInteraction,
	SlashCommandBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	EmbedBuilder,
	ButtonStyle,
	version,
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('status')
		.setDescription('📈 • Reagiert mit allen Informationen rund um den Status des Bot-Users.'),

	/**
	 *
	 * @param { ChatInputCommandInteraction } interaction
	 */
	async execute(interaction) {
		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setStyle(ButtonStyle.Link)
					.setLabel('felix.monster-Status')
					.setURL('https://status.felix.monster')
					.setDisabled(false),

				new ButtonBuilder()
					.setStyle(ButtonStyle.Link)
					.setLabel('felix.monster-Website')
					.setURL('https://felix.monster')
					.setDisabled(false),
			);

		const bobTheBuilder = new EmbedBuilder();

		bobTheBuilder
			.setColor(0x095FF1)
			.setAuthor({
				name: 'Bitte gedulde dich',
				iconURL: 'https://img.icons8.com/ios-glyphs/90/ffffff/speed.png',
			})
			.setDescription('Ich teste meine Latenz.');

		const sent = await interaction.reply({
			fetchReply: true,
			ephemeral: true,
			embeds: [bobTheBuilder],
		});

		const roundtripLatency = sent.createdTimestamp - interaction.createdTimestamp;
		let latencyPart;

		if (roundtripLatency > 350) {
			latencyPart = 'Das ist in einem akzeptablen Bereich, aber keine Spitzenleistung.';
		}
		else {
			latencyPart = 'Das ist ganz normal und ein guter Wert!';
		}

		bobTheBuilder
			.setAuthor({
				name: 'Ich fühle mich fast so schnell wie Usain Bolt',
				iconURL: 'https://img.icons8.com/ios-glyphs/90/ffffff/speed.png',
			})
			.setDescription(`Meine Schnittstelle weist eine Latenz von \`${Math.round(interaction.client.ws.ping)}ms\` auf.
            Die Roundtrip-Latenz beträgt \`${roundtripLatency}ms\`. ${latencyPart}
            
            Die Bot-Instanz wurde <t:${parseInt(interaction.client.readyTimestamp / 1000)}:R> gestartet und ist seitdem verfügbar.

            Der Government Butler ist ein Projekt von <@272663056075456512> für das Government auf LifeV, gemacht mit NodeJS, der nightmare API und gaaanz viel <a:scribble_heart:1054383917811114105>.
            • ${interaction.client.commands.size} Befehle registriert
            • ${interaction.client.events.size} Events registriert
            • DiscordJS ${version}
            • NodeJS ${process.version}
                        
            Du hast irgendwelche Anregungen, Kritik, Probleme oder eine Frage? Schick dem Bot einfach eine DM! :sparkles:`);

		interaction.editReply({
			ephemeral: true,
			embeds: [bobTheBuilder],
			components: [row],
		});
	},
};
