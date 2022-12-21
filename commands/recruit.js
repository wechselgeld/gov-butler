const dayjs = require('dayjs');
const {
	ChatInputCommandInteraction,
	SlashCommandBuilder,
	EmbedBuilder,
	Formatters,
	Client,
} = require('discord.js');
const models = require('../functions/databaseModels');
const rankHelper = require('../functions/rankHelper');
const loggerFactory = require('../functions/loggerFactory');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('recruit')
		.setDescription('➕ • Stellt einen Agent ein.')
		.addSubcommand(subcommand =>
			subcommand
				.setName('usss')
				.setDescription('Rekrutiert eine Person für den U.S. Secret Service.')
				.addUserOption(option => option
					.setName('person')
					.setDescription('Wähle die Person aus, welche Du einstellen möchtest.')
					.setRequired(true),
				)
				.addStringOption(option => option
					.setName('firstname')
					.setDescription('Tippe den Vornamen der Person ein.')
					.setRequired(true),
				)
				.addStringOption(option => option
					.setName('lastname')
					.setDescription('Tippe den Nachnamen der Person ein.')
					.setRequired(true),
				)
				.addIntegerOption(option => option
					.setName('servicenumber')
					.setDescription('Wähle aus, welche Dienstnummer die Person erhält.')
					.setMinValue(10)
					.setMaxValue(99)
					.setRequired(true),
				)
				.addStringOption(option => option
					.setName('rank')
					.setDescription('Wähle den Rang der Person aus.')
					.addChoices({
						name: 'Rang 9 - Director of Secret Service',
						value: '9',
					}, {
						name: 'Rang 8 - Special Agent in Charge',
						value: '8',
					}, {
						name: 'Rang 7 - Deputy Special Agent in Charge',
						value: '7',
					}, {
						name: 'Rang 6 - Assistant Special Agent in Charge',
						value: '6',
					}, {
						name: 'Rang 5 - Supervisory Special Agent',
						value: '5',
					}, {
						name: 'Rang 4 - Senior Special Agent',
						value: '4',
					}, {
						name: 'Rang 3 - Special Agent',
						value: '3',
					}, {
						name: 'Rang 2 - Senior Agent',
						value: '2',
					}, {
						name: 'Rang 1 - Agent',
						value: '1',
					}, {
						name: 'Rang 0 - Agent in Training',
						value: '0',
					})
					.setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('doj')
				.setDescription('Rekrutiert eine Person für das U.S. Department of Justice.')
				.addUserOption(option => option
					.setName('person')
					.setDescription('Wähle die Person aus, welche Du einstellen möchtest.')
					.setRequired(true),
				)
				.addStringOption(option => option
					.setName('firstname')
					.setDescription('Tippe den Vornamen der Person ein.')
					.setRequired(true),
				)
				.addStringOption(option => option
					.setName('lastname')
					.setDescription('Tippe den Nachnamen der Person ein.')
					.setRequired(true),
				)
				.addStringOption(option => option
					.setName('rank')
					.setDescription('Wähle den Rang der Person aus.')
					.addChoices({
						name: 'Rang 21 - Secretary of Justice',
						value: '21-soj',
					}, {
						name: 'Rang 15 - Chief Justice',
						value: '15',
					}, {
						name: 'Rang 14 - Federal Judge',
						value: '14',
					}, {
						name: 'Rang 13 - Judge',
						value: '13',
					}, {
						name: 'Rang 12 - U.S. District Attorney',
						value: '12',
					}, {
						name: 'Rang 11 - U.S. Judicial Officer',
						value: '11',
					}, {
						name: 'Rang 10 - U.S. Judicial Officer in Training',
						value: '10',
					})
					.setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('gov')
				.setDescription('Rekrutiert eine Person für das U.S. Government.')
				.addUserOption(option => option
					.setName('person')
					.setDescription('Wähle die Person aus, welche Du einstellen möchtest.')
					.setRequired(true),
				)
				.addStringOption(option => option
					.setName('firstname')
					.setDescription('Tippe den Vornamen der Person ein.')
					.setRequired(true),
				)
				.addStringOption(option => option
					.setName('lastname')
					.setDescription('Tippe den Nachnamen der Person ein.')
					.setRequired(true),
				)
				.addStringOption(option => option
					.setName('rank')
					.setDescription('Wähle den Rang der Person aus.')
					.addChoices({
						name: 'Rang 23 - President of the United States',
						value: '23',
					}, {
						name: 'Rang 22 - Vice President of the United States',
						value: '22',
					}, {
						name: 'Rang 21 - Secretary of Defense',
						value: '21-sod',
					}, {
						name: 'Rang 21 - Secretary of Interior',
						value: '21-soi',
					}, {
						name: 'Rang 20 - Chief Administrative Officer',
						value: '20',
					}, {
						name: 'Rang 19 - First Lady',
						value: '19',
					}, {
						name: 'Rang 18 - Second Lady',
						value: '18',
					}, {
						name: 'Rang 17 - Secretary of President',
						value: '17',
					}, {
						name: 'Rang 16 - Secretary of Cabinet',
						value: '16',
					})
					.setRequired(true))),

	/**
	 *
	 * @param { ChatInputCommandInteraction } interaction
	 * @param { Client } client
	 */
	async execute(interaction, client) {
		await interaction.deferReply({
			ephemeral: true,
		});

		const subcommand = interaction.options.getSubcommand();
		const user = interaction.options.getUser('person');
		const member = interaction.options.getMember('person');
		const firstName = interaction.options.getString('firstname');
		const lastName = interaction.options.getString('lastname');
		const rankChoice = interaction.options.getString('rank');

		let authorityName;
		let isUSSS;
		let serviceNumber;

		switch (subcommand) {
		case 'usss':
			authorityName = 'U.S. Secret Service';
			isUSSS = true;
			serviceNumber = interaction.options.getInteger('servicenumber').toString();
			break;
		case 'doj':
			authorityName = 'U.S. Department of Justice';
			isUSSS = false;
			break;
		case 'gov':
			authorityName = 'U.S. Governments';
			isUSSS = false;
			break;
		default:
			authorityName = '*N/A*';
			isUSSS = false;
		}

		if (subcommand === 'usss') {
			const foundUser = await models.users.findOne({
				where: {
					serviceNumber: serviceNumber,
				},
			});

			if (foundUser) {
				return interaction.followUp({
					content: 'Es existiert leider bereits ein Agent mit der angegebenen Dienstnummer.',
					ephemeral: true,
				});
			}
		}

		try {
			await models.users.create({
				discordId: user.id,
				timestamp: dayjs().unix(),
				serviceNumber: isUSSS ? serviceNumber : null,
				firstName: firstName,
				lastName: lastName,
				rank: rankChoice,
				rankType: subcommand,
			});
		}
		catch (error) {
			if (error.name === 'SequelizeUniqueConstraintError') {
				return interaction.followUp({
					content: 'Diese Person ist bereits im System registriert.',
					ephemeral: true,
				});
			}
		}

		await member.roles.set([
			// "Angestellt"
			'1043628372544192563',
			// "U.S. Secret Service" Divider
			'1033480589677965453',
			// "Extras" Divider
			'1033481131170992195',
			rankHelper.resolveRoleId(rankChoice),
		]);

		member.setNickname(`${serviceNumber ? `[${serviceNumber}] ` : ''}${firstName} ${lastName}`);

		const embedBuilder = new EmbedBuilder();

		embedBuilder
			.setColor(0x57F287)
			.setAuthor({
				name: `${firstName} ${lastName} wurde eingestellt`,
				iconURL: 'https://img.icons8.com/ios-glyphs/30/ffffff/conference-background-selected.png',
			})
			.setDescription(`> Liebe Kolleginnen und Kollegen,
			> zur Kenntnisnahme, es erfolgte eine Einweisung in Dienst des ${authorityName}.
			
			${user.toString()} » ${Formatters.roleMention(rankHelper.resolveRoleId(rankChoice))} (${subcommand.toUpperCase()})
			
			${Formatters.spoiler(`Entschieden von ${interaction.user.toString()}`)}`);

		const channel = await interaction.client.channels.fetch(client.config.channels.employmentChannelId);

		channel.send({
			content: user.toString(),
			embeds: [embedBuilder],
		});

		interaction.followUp({
			content: 'Du hast die Person eingestellt.',
			ephemeral: true,
		});

		loggerFactory.sendLog(interaction.client, 'staff', 0x88ec64, `${firstName} ${lastName} wurde eingestellt`, 'https://img.icons8.com/ios-glyphs/30/ffffff/conference-background-selected.png', `${interaction.user.toString()} hat <t:${dayjs().unix()}:R> ${user.toString()} mit dem Rang ${Formatters.roleMention(rankHelper.resolveRoleId(rankChoice))} (${subcommand.toUpperCase()}) eingestellt.`);
	},
};