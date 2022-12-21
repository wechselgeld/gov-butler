const {
	Formatters,
	GuildMember,
	EmbedBuilder,
} = require('discord.js');
const dayjs = require('dayjs');

const config = require('../config.json');
const loggerFactory = require('../functions/loggerFactory');

module.exports = {
	name: 'guildMemberAdd',
	once: false,

	/**
	 *
	 * @param { GuildMember } member
	 */
	async execute(member) {
		loggerFactory.sendLog(member.client, 'joinleave', 0x88ec64, 'Nutzer beigetreten', 'https://img.icons8.com/ios-glyphs/90/ffffff/so-so.png', `${member.user.toString()} (\`${member.user.id}\`) hat <t:${dayjs().unix()}:R> den Discord Server betreten.`);

		member.roles.add('996891153762881557', 'User joined discord server');

		const channel = await member.client.channels.fetch(config.channels.welcomeChannelId);

		const bobTheBuilder = new EmbedBuilder();

		bobTheBuilder
			.setColor(0xfeeec8)
			.setAuthor({
				name: 'Willkommen auf dem Government-Discord',
				iconURL: 'https://img.icons8.com/ios-glyphs/90/ffffff/so-so.png',
			})
			.setDescription(`Wir freuen uns, dass du hier her gefunden hast, ${member.user.toString()}!
            
            Um direkt starten zu können, solltest Du in dem ${Formatters.channelMention(config.channels.roleRequestChannelId)}-Kanal Deine Rollen anfragen.
            
            Wir freuen uns auf dich! <a:scribble_heart:1037345722724524104>`);

		channel.send({
			content: member.user.toString(),
			embeds: [bobTheBuilder],
		});
	},
};