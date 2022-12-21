const {
	Client,
	EmbedBuilder,
} = require('discord.js');

/**
 *
 * @param { Client } client
 */
/* async function pushDutyPanel(client) {
	     const embedBuilder = new EmbedBuilder;

          const channel = await client.channels.fetch(config.channels.dutyChannelId);

          embedBuilder
              .setColor(0xEB459E)
              .setAuthor({
                  name: 'Dienstan- und Abmeldung',
                  iconURL: 'https://cdn.discordapp.com/emojis/988134022607695872.webp?size=96&quality=lossless'
              })
              .setDescription('Sobald du auf **<:iaa_check_white:986304520588001330> Dienstantritt** klickst, trägst du dich in den Dienst ein.\nAuf **<:iaa_decline_white:986304638498258954> Dienstaustritt** solltest du klicken, wenn du noch online bleibst, aber nicht im Dienst bist.\nVerwende **<:iaa_sleep_white:986298140435050536> Offline**, sobald du dich nicht mehr auf LifeV befindest.');

          const row = new ActionRowBuilder()
              .addComponents(onDutyButton.data.builder, offDutyButton.data.builder, offlineButton.data.builder, dutyDistributorButton.data.builder);

          await channel.bulkDelete(100);

          await channel.send({
              embeds: [embedBuilder],
              components: [row]
          });
}

exports.pushDutyPanel = pushDutyPanel; */

/**
 *
 * @param { Client } client
 */
async function pushServiceNumberMessage(client) {
	const embedBuilder = new EmbedBuilder();

	const channel = await client.channels.fetch(client.config.channels.rosterChannelId);
	const guild = await client.guilds.fetch(client.config.guildId);

	await guild.roles.fetch();
	await guild.members.fetch();

	const teamRole = await guild.roles.fetch(client.config.roles.employeeRoleId);

	const testArray = [];

	await client.config.roles.staffRoleIds.forEach(async (entry) => {
		const rankRole = guild.roles.cache.get(entry);

		if (!rankRole.members.size > 0) return testArray.push(`**${rankRole.name.replace('↬ ', '')}**\n*Keine Mitglieder*`);

		testArray.push(`**${rankRole.name.replace('↬ ', '')}**\n${rankRole.members.sort((char) => char.nickname.indexOf(0) - char.nickname.indexOf(1)).map(member => `• ${member.user.toString()}`).join('\n')}`);
	});

	embedBuilder
		.setColor(0xfeeec8)
		.setAuthor({
			name: 'Mitarbeiter-Roster',
			iconURL: 'https://cdn.discordapp.com/emojis/988436239399137290.webp?size=96&quality=lossless',
		})
		.setDescription(`Das Government besteht momentan aus **${teamRole.members.size} Mitgliedern**.
            Diese Auflistung wird stündlich aktualisiert.
            
            ${testArray.join('\n\n').toString()}`);

	await channel.bulkDelete(100);
	await channel.send({
		embeds: [embedBuilder],
	});
}

exports.pushServiceNumberMessage = pushServiceNumberMessage;

/**
 *
 * @param { Client } client
 */
/* async function pushBotPanel(client) {
	     const channel = await client.channels.fetch(config.channels.botPanelChannelId);

          await channel.bulkDelete(100);

          const row = new ActionRowBuilder()
              .addComponents(postAnnouncementButton.data.builder, postAppointmentButton.data.builder);

          await channel.send({
              components: [row]
          });
}

exports.pushBotPanel = pushBotPanel; */