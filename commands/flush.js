const {
	ChatInputCommandInteraction,
	SlashCommandBuilder,
	PermissionFlagsBits,
	Client,
} = require('discord.js');
const dayjs = require('dayjs');

const {
	loadCommands,
} = require('../handlers/commandLoader');
const {
	loadEvents,
} = require('../handlers/eventLoader');
const {
	loadModals,
} = require('../handlers/modalLoader');
const {
	loadButtons,
} = require('../handlers/buttonLoader');

const loggerFactory = require('../functions/loggerFactory');

module.exports = {
	developer: true,
	data: new SlashCommandBuilder()
		.setName('flush')
		.setDescription('♻️ • Aktualisiert den Cache ausgewählter Events und Befehle.')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.addSubcommand(subcommand =>
			subcommand
				.setName('events')
				.setDescription('Lädt alle Events neu.'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('commands')
				.setDescription('Lädt alle Slash-Befehle neu.'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('modals')
				.setDescription('Lädt alle Modals neu.'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('buttons')
				.setDescription('Lädt alle Buttons neu.'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('all')
				.setDescription('Lädt alle Client-Funktionen neu.')),

	/**
	 *
	 * @param { ChatInputCommandInteraction } interaction
	 * @param { Client } client
	 */
	execute(interaction, client) {
		const subcommand = interaction.options.getSubcommand();
		let type = 'undefined';

		switch (subcommand) {
		case 'events': {
			for (const [key, value] of client.events) client.removeListener(`${key}`, value, true);
			loadEvents(client);

			interaction.reply({
				content: 'Es wurden alle Events neu geladen.',
				ephemeral: true,
			});

			type = 'Events';
			break;
		}
		case 'commands': {
			loadCommands(client);

			interaction.reply({
				content: 'Es wurden alle Slash-Befehle neu geladen.',
				ephemeral: true,
			});

			type = 'Slash-Befehle';
			break;
		}
		case 'modals': {
			loadModals(client);

			interaction.reply({
				content: 'Es wurden alle Modals neu geladen.',
				ephemeral: true,
			});

			type = 'Modals';
			break;
		}
		case 'buttons': {
			loadButtons(client);

			interaction.reply({
				content: 'Es wurden alle Buttons neu geladen.',
				ephemeral: true,
			});

			type = 'Buttons';
			break;
		}
		case 'all': {
			for (const [key, value] of client.events) client.removeListener(`${key}`, value, true);
			loadEvents(client);
			loadCommands(client);
			loadModals(client);
			loadButtons(client);

			interaction.reply({
				content: 'Es wurden alle Client-Funktionen neu geladen.',
				ephemeral: true,
			});

			type = 'Client-Funktionen';
			break;
		}
		}

		loggerFactory.sendLog(client, 'status', 0x88ec64, `${type} neu geladen`, 'https://img.icons8.com/ios-glyphs/30/ffffff/refresh--v1.png', `${interaction.user.toString()} hat <t:${dayjs().unix()}:R> den Cache der ${type} neu geladen.`, '272663056075456512');
	},
};