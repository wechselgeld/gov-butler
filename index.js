const logs = require('discord-logs');
const consola = require('consola');
const {
	Client,
	IntentsBitField,
	Partials,
	Collection,
} = require('discord.js');
const models = require('./functions/databaseModels');

const {
	loadEvents,
} = require('./handlers/eventLoader');
const {
	loadCommands,
} = require('./handlers/commandLoader');
const {
	loadModals,
} = require('./handlers/modalLoader');
const {
	loadButtons,
} = require('./handlers/buttonLoader');

// Construct bot client
const client = new Client({
	intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMembers, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.GuildPresences],
	partials: [Partials.User, Partials.GuildMember, Partials.ThreadMember, Partials.Channel, Partials.Message],
});

client.config = require('./config.json');
client.events = new Collection();
client.commands = new Collection();
client.buttons = new Collection();
client.modals = new Collection();

client.login(client.config.token)
	.then(async () => {
		await loadEvents(client);
		await loadButtons(client);
		await loadModals(client);
		await loadCommands(client);
		await logs(client);
		await models.sequelize.sync();

		console.log('\n\n \u2588\u2588\u2588\u2584    \u2588  \u2588\u2588\u2593  \u2584\u2588\u2588\u2588\u2588  \u2588\u2588\u2591 \u2588\u2588 \u2584\u2584\u2584\u2588\u2588\u2588\u2588\u2588\u2593 \u2588\u2588\u2588\u2584 \u2584\u2588\u2588\u2588\u2593 \u2584\u2584\u2584       \u2588\u2588\u2580\u2588\u2588\u2588  \u2593\u2588\u2588\u2588\u2588\u2588 \n \u2588\u2588 \u2580\u2588   \u2588 \u2593\u2588\u2588\u2592 \u2588\u2588\u2592 \u2580\u2588\u2592\u2593\u2588\u2588\u2591 \u2588\u2588\u2592\u2593  \u2588\u2588\u2592 \u2593\u2592\u2593\u2588\u2588\u2592\u2580\u2588\u2580 \u2588\u2588\u2592\u2592\u2588\u2588\u2588\u2588\u2584    \u2593\u2588\u2588 \u2592 \u2588\u2588\u2592\u2593\u2588   \u2580 \n\u2593\u2588\u2588  \u2580\u2588 \u2588\u2588\u2592\u2592\u2588\u2588\u2592\u2592\u2588\u2588\u2591\u2584\u2584\u2584\u2591\u2592\u2588\u2588\u2580\u2580\u2588\u2588\u2591\u2592 \u2593\u2588\u2588\u2591 \u2592\u2591\u2593\u2588\u2588    \u2593\u2588\u2588\u2591\u2592\u2588\u2588  \u2580\u2588\u2584  \u2593\u2588\u2588 \u2591\u2584\u2588 \u2592\u2592\u2588\u2588\u2588   \n\u2593\u2588\u2588\u2592  \u2588 \u2588\u2588\u2592\u2591\u2588\u2588\u2591\u2591\u2593\u2588  \u2588\u2588\u2593\u2591\u2593\u2588 \u2591\u2588\u2588 \u2591 \u2593\u2588\u2588\u2593 \u2591 \u2592\u2588\u2588    \u2592\u2588\u2588 \u2591\u2588\u2588\u2584\u2584\u2584\u2584\u2588\u2588 \u2592\u2588\u2588\u2580\u2580\u2588\u2584  \u2592\u2593\u2588  \u2584 \n\u2592\u2588\u2588\u2591   \u2593\u2588\u2588\u2591\u2591\u2588\u2588\u2591\u2591\u2592\u2593\u2588\u2588\u2588\u2580\u2592\u2591\u2593\u2588\u2592\u2591\u2588\u2588\u2593  \u2592\u2588\u2588\u2592 \u2591 \u2592\u2588\u2588\u2592   \u2591\u2588\u2588\u2592 \u2593\u2588   \u2593\u2588\u2588\u2592\u2591\u2588\u2588\u2593 \u2592\u2588\u2588\u2592\u2591\u2592\u2588\u2588\u2588\u2588\u2592\n\u2591 \u2592\u2591   \u2592 \u2592 \u2591\u2593   \u2591\u2592   \u2592  \u2592 \u2591\u2591\u2592\u2591\u2592  \u2592 \u2591\u2591   \u2591 \u2592\u2591   \u2591  \u2591 \u2592\u2592   \u2593\u2592\u2588\u2591\u2591 \u2592\u2593 \u2591\u2592\u2593\u2591\u2591\u2591 \u2592\u2591 \u2591\n\u2591 \u2591\u2591   \u2591 \u2592\u2591 \u2592 \u2591  \u2591   \u2591  \u2592 \u2591\u2592\u2591 \u2591    \u2591    \u2591  \u2591      \u2591  \u2592   \u2592\u2592 \u2591  \u2591\u2592 \u2591 \u2592\u2591 \u2591 \u2591  \u2591\n   \u2591   \u2591 \u2591  \u2592 \u2591\u2591 \u2591   \u2591  \u2591  \u2591\u2591 \u2591  \u2591      \u2591      \u2591     \u2591   \u2592     \u2591\u2591   \u2591    \u2591   \n         \u2591  \u2591        \u2591  \u2591  \u2591  \u2591                \u2591         \u2591  \u2591   \u2591        \u2591  \u2591 \n\n');
		consola.success(`Ready! Logged in as ${client.user.tag}.`);
	})
	.catch((error) => {
		consola.error(error);
	});

process.on('unhandledRejection', error => {
	consola.error('Unhandled promise rejection:', error);
});

client.on('error', error => {
	consola.error(error);
});

process.on('uncaughtException', (error, origin) => {
	consola.error(error, origin);
});

process.on('uncaughtExceptionMonitor', (error, origin) => {
	consola.error(error, origin);
});