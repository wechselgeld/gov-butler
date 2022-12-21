const {
	ChatInputCommandInteraction,
	SlashCommandBuilder,
	EmbedBuilder,
	Formatters,
	ChannelType,
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('🔎 • Gibt Informationen zu bestimmten Nutzern oder dem Server aus.')
		.addSubcommand(subcommand =>
			subcommand
				.setName('user')
				.setDescription('Gibt Informationen über einen bestimmten Nutzer.')
				.addUserOption(options =>
					options
						.setName('user')
						.setDescription('Der Nutzer, von welchem du Informationen erhalten möchtest..')
						.setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('guild')
				.setDescription('Zeigt Informationen zum Government Discord Server an.')),

	/**
	 *
	 * @param { ChatInputCommandInteraction } interaction
	 */
	async execute(interaction) {
		const subcommand = interaction.options.getSubcommand();

		switch (subcommand) {
		case 'user': {
			const target = interaction.options.getMember('user') || interaction.member;

			const {
				user,
				presence,
				roles,
			} = target;

			await user.fetch();

			const activityType = [
				'*Spielt*',
				'*Streamt*',
				'*Hört*',
				'*Schaut*',
				'',
				'*Tritt an in*',
			];

			const clientType = [{
				name: 'desktop',
				text: 'Desktop',
			},
			{
				name: 'mobile',
				text: 'Handy',
			},
			{
				name: 'web',
				text: 'Website',
			},
			{
				name: 'offline',
				text: 'Offline',
			},
			];

			const maxDisplayRoles = (roles, maxFieldLength = 1024) => {
				let totalLength = 0;
				const result = [];

				for (const role of roles) {
					const roleString = `<@&${role.id}>`;

					if (roleString.length + totalLength > maxFieldLength) { break; }

					totalLength += roleString.length + 1;
					result.push(roleString);
				}

				return result.length;
			};

			const sortedRoles = roles.cache.map(role => role).sort((a, b) => b.position - a.position).slice(0, roles.cache.size - 1);

			const clientStatus = presence?.clientStatus instanceof Object ? Object.keys(presence.clientStatus) : 'offline';

			const deviceFilter = clientType.filter(device => clientStatus.includes(device.name));
			const devices = !Array.isArray(deviceFilter) ? new Array(deviceFilter) : deviceFilter;

			const bobTheBuilder = new EmbedBuilder();

			bobTheBuilder
				.setColor(0xfeeec8)
				.setAuthor({
					name: `Nutzerinformationen über ${target.nickname || target.user.tag}`,
					iconURL: 'https://img.icons8.com/ios-glyphs/90/ffffff/test-account.png',
				})
				.setDescription(`**ACCOUNT**
                    ID ↬ ${Formatters.inlineCode(user.id)}
                    Aktivitäten ↬ ${presence?.activities.map(activity => `${activityType[activity.type]} ${Formatters.inlineCode(activity.name)}`).join(', ') || Formatters.inlineCode('Keine Aktivitäten')}
                    Accounterstellung ↬ <t:${parseInt(user.createdTimestamp / 1000)}:R>
                    Geräte online ↬ ${devices.map(device => `${Formatters.inlineCode(device.text)}`).join(', ')}

                    **DISCORD SERVER**
                    Beitritt ↬ <t:${parseInt(target.joinedTimestamp / 1000)}:R>
                    Nickname ↬ ${Formatters.inlineCode(target.nickname || 'Nicht gesetzt')}
                    Rollen ↬ ${Formatters.roleMention(target.roles.hoist.id)} | ${sortedRoles.slice(0, maxDisplayRoles(sortedRoles)).join(', ') || 'Keine Rollen'} (${maxDisplayRoles(sortedRoles)} von ${sortedRoles.length})
                    Booster-Status ↬ ${roles.premiumSubscriberRole ? `${Formatters.inlineCode('Ja')} (Angefangen <t:${parseInt(target.premiumSinceTimestamp / 1000)}:R>)` : Formatters.inlineCode('Boostet nicht')}
                    Anpassbarkeit vom Bot ↬ ${target.manageable.toString().replace('true', Formatters.inlineCode('Gegeben')).replace('false', Formatters.inlineCode('Nicht gegeben'))}

                    **PERSONALISIERUNG**
                    Profilbanner ↬ ${user.bannerURL({ size: 1024 }) ? `[${Formatters.inlineCode('CDN Link')}](${user.bannerURL()})` : Formatters.inlineCode('Nicht gesetzt')}
                    Profilbild ↬ ${user.avatarURL({ size: 1024 }) ? ` [${Formatters.inlineCode('CDN Link')}](${user.avatarURL()})` : Formatters.inlineCode('Nicht gesetzt')}
                    Akzentfarbe ↬ ${Formatters.inlineCode(user.hexAccentColor || 'Nicht gesetzt')}`)
				.setThumbnail(user.avatarURL({
					size: 1024,
				}))
				.setImage(user.bannerURL({
					size: 1024,
				}));

			interaction.reply({
				embeds: [bobTheBuilder],
				ephemeral: true,
			});
			break;
		}

		case 'guild': {
			const {
				guild,
			} = interaction;
			const {
				members,
				channels,
				emojis,
				stickers,
			} = guild;

			await guild.invites.fetch();
			await guild.fetch();

			const botCount = members.cache.filter(member => member.user.bot).size;

			const getChannelTypeSize = type => channels.cache.filter(channel => type.includes(channel.type)).size;

			const totalChannels = getChannelTypeSize([
				ChannelType.GuildText,
				ChannelType.GuildNews,
				ChannelType.GuildVoice,
				ChannelType.GuildStageVoice,
				ChannelType.GuildForum,
				ChannelType.GuildPublicThread,
				ChannelType.GuildPrivateThread,
				ChannelType.GuildNewsThread,
				ChannelType.GuildCategory,
			]);

			const bobTheBuilder = new EmbedBuilder();

			bobTheBuilder
				.setColor(0xfeeec8)
				.setAuthor({
					name: `Serverinformationen über ${guild.name}`,
					iconURL: 'https://img.icons8.com/ios-glyphs/90/ffffff/city-hall.png',
				})
				.setDescription(`**ALLGEMEINE INFORMATIONEN**
                    ID ↬ ${Formatters.inlineCode(guild.id)}
                    Beschreibung ↬ ${Formatters.inlineCode(guild.description || 'Keine Beschreibung')}
                    Erstellung ↬ <t:${parseInt(guild.createdTimestamp / 1000)}:R>
                    Besitzer ↬ ${Formatters.userMention(guild.ownerId)} (${Formatters.inlineCode(guild.ownerId)})

                    **EINLADUNGEN**
                    Vanity-Einladung ↬ ${Formatters.inlineCode(guild.vanityURLCode || 'Nicht gesetzt')}
                    Anzahl der Einladungslinks ↬ ${Formatters.inlineCode(guild.invites.cache.size)}

                    **MITGLIEDER**
                    Mitglieder, abzüglich Bots ↬ ${Formatters.inlineCode(guild.memberCount - botCount)}
                    Bot-Accounts ↬ ${Formatters.inlineCode(botCount)}

                    **KANÄLE**
                    Text ↬ ${Formatters.inlineCode(getChannelTypeSize([ChannelType.GuildText, ChannelType.GuildForum, ChannelType.GuildNews]))}
                    Voice ↬ ${Formatters.inlineCode(getChannelTypeSize([ChannelType.GuildVoice, ChannelType.GuildStageVoice]))}
                    Threads ↬ ${Formatters.inlineCode(getChannelTypeSize([ChannelType.GuildPublicThread, ChannelType.GuildPrivateThread, ChannelType.GuildNewsThread]))}
                    Kategorien ↬ ${Formatters.inlineCode(getChannelTypeSize([ChannelType.GuildCategory]))}
                    Kanäle & Kategorien insgesamt ↬ ${Formatters.inlineCode(totalChannels)}

                    **EMOJIS & STICKER**
                    Animierte Emojis ↬ ${Formatters.inlineCode(emojis.cache.filter(emoji => emoji.animated).size)}
                    Statische Emojis ↬ ${Formatters.inlineCode(emojis.cache.filter(emoji => !emoji.animated).size)}
                    Sticker ↬ ${Formatters.inlineCode(stickers.cache.size)}

                    **PERSONALISIERUNG**
                    Serverbanner ↬ ${guild.bannerURL({ size: 1024 }) ? `[${Formatters.inlineCode('CDN Link')}](${guild.bannerURL()})` : Formatters.inlineCode('Nicht gesetzt')}
                    Serverbild ↬ ${guild.iconURL({ size: 1024 }) ? `[${Formatters.inlineCode('CDN Link')}](${guild.iconURL()})` : Formatters.inlineCode('Nicht gesetzt')}`)
				.setThumbnail(guild.iconURL({
					size: 1024,
				}))
				.setImage(guild.bannerURL({
					size: 1024,
				}));

			interaction.reply({
				embeds: [bobTheBuilder],
				ephemeral: true,
			});
			break;
		}
		}
	},
};
