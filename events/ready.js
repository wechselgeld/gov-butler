const consola = require('consola');
const dayjs = require('dayjs');
const cron = require('node-cron');
const {
	ActivityType,
	Formatters,
	Client,
} = require('discord.js');

const loggerFactory = require('../functions/loggerFactory');
const recurringsSender = require('../functions/recurringsSender');

module.exports = {
	name: 'ready',
	once: true,

	/**
	 *
	 * @param { Client } client
	 */
	async execute(client) {
		if (client.config.devBuild) {
			client.user.setPresence({
				activities: [{
					name: '⛔ Entwickler-Instanz',
					type: ActivityType.Streaming,
					url: 'https://www.youtube.com/watch?v=fC7oUOUEEi4',
				}],
			});
		}
		else {
			let state = 0;
			const presences = [{
				type: ActivityType.Playing,
				message: 'Geldtransport-Simulator',
			},
			{
				type: ActivityType.Listening,
				message: `[${client.config.versionType}] ${client.config.versionString}`,
			},
			{
				type: ActivityType.Playing,
				message: 'auf Life-V 🔥',
			},
			{
				type: ActivityType.Playing,
				message: 'mit Felix',
			},
			{
				type: ActivityType.Playing,
				message: 'GtA rOlLEnSpIEl',
			},
			{
				type: ActivityType.Playing,
				message: 'Lattenrost-RP',
			},
			];

			setInterval(() => {
				state = (state + 1) % presences.length;
				const presence = presences[state];

				client.user.setActivity(presence.message, {
					type: presence.type,
				});
			}, 30000);
		}

		if (!client.config.quickStart) {
			// Send the service number message
			recurringsSender.pushServiceNumberMessage(client);
		}

		// Schedule the service number message every hour
		cron.schedule('0 * * * *', async () => {
			recurringsSender.pushServiceNumberMessage(client);
		}).start();

		if (client.config.devBuild) {
			consola.info(`Running a developer build - Version ${client.config.versionString} [${client.config.versionType}]`);
		}
		else {
			// Send the "i'm here"-log
			loggerFactory.sendLog(client, 'status', 0x88ec64, 'Bot startet', 'https://img.icons8.com/ios-glyphs/90/ffffff/rocket.png', `${Formatters.userMention('272663056075456512')} hat <t:${dayjs().unix()}:R> den Bot gestartet.\n\nversionString ↬ \`${client.config.versionString}\` \nversionType ↬ \`${client.config.versionType}\``, '272663056075456512');
		}
	},
};