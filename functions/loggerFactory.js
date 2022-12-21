const {
	EmbedBuilder,
	Client,
} = require('discord.js');
const consola = require('consola');
const config = require('../config.json');

/**
 *
 * @param { Client } clientInstance
 * @param { string } logType
 * @param {*} embedColor
 * @param { string } embedTitle
 * @param { string } embedIconUrl
 * @param { string } embedDescription
 */
async function sendLog(clientInstance, logType, embedColor, embedTitle, embedIconUrl, embedDescription) {
	const embedBuilder = new EmbedBuilder();

	let channelId;

	switch (logType) {
	case 'status':
		channelId = config.channels.statusLogChannelId;
		break;
	case 'joinleave':
		channelId = config.channels.gateLogChannelId;
		break;
	case 'duty':
		channelId = config.channels.dutyLogChannelId;
		break;
	case 'staff':
		channelId = config.channels.staffLogChannelId;
		break;
	default:
		return consola.error('Did not set correct log type while using helpers/senders.');
	}

	const channel = await clientInstance.channels.fetch(channelId);

	embedBuilder
		.setColor(embedColor)
		.setAuthor({
			name: embedTitle,
			iconURL: embedIconUrl,
		})
		.setDescription(embedDescription);

	const webhooks = await channel.fetchWebhooks();
	let found = webhooks.first();

	if (!found) {
		found = await channel.createWebhook({
			name: 'nightmare API Logging Utility',
			avatar: 'https://i.ibb.co/X2qgmNm/image-18.png',
			reason: 'Logging utility couldn\'t find a valid webhook',
		});
	}

	await found.send({
		username: 'nightmare API Logging Utility',
		avatarURL: 'https://i.ibb.co/X2qgmNm/image-18.png',
		embeds: [embedBuilder],
	});
}

exports.sendLog = sendLog;
