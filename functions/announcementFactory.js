const {
	EmbedBuilder,
	GuildMember,
	BaseGuildTextChannel,
} = require('discord.js');

/**
 *
 * Sends a announcement via direct message to a member.
 *
 * @param { GuildMember } member
 * @param { BaseGuildTextChannel } channel
 */
async function send(member, channel) {
	const embedBuilder = new EmbedBuilder();

	embedBuilder
		.setColor(0xfeeec8)
		.setAuthor({
			name: 'Es gibt Neuigkeiten zu Deiner Bewerbung als Federal Agent',
			iconURL: 'https://cdn.discordapp.com/emojis/971446924651667516.webp?size=96&quality=lossless',
		})
		.setDescription(`Hallo ${member.user.toString()},
        diese Nachricht wurde von dem Ocean-V Ticket Bot gesendet. Aber nicht ohne Grund — denn es gibt wichtige Neuigkeiten zu Deiner Bewerbung!
        Klicke [auf den blauen Text](${channel.url}), um zu Deinem Ticket-Kanal zu gelangen.`);

	await member.send({
		embeds: [embedBuilder],
	}).catch(() => {
		channel.send(member.user.toString());
	});
}

exports.send = send;