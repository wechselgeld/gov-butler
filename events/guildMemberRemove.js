const {
	GuildMember,
} = require('discord.js');
const dayjs = require('dayjs');

const loggerFactory = require('../functions/loggerFactory');

module.exports = {
	name: 'guildMemberRemove',
	once: false,

	/**
	 *
	 * @param { GuildMember } member
	 */
	execute(member) {
		loggerFactory.sendLog(member.user.client, 'joinleave', 0x88ec64, 'Nutzer verlassen', 'https://img.icons8.com/ios-glyphs/90/ffffff/so-so.png', `${member.user.toString()} (\`${member.user.id}\`) hat <t:${dayjs().unix()}:R> den Discord Server verlassen.`);
	},
};