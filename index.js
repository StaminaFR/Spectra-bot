require('dotenv').config();

const {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder
} = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const commands = [
  new SlashCommandBuilder()
    .setName('weekly')
    .setDescription('Affiche le défi hebdomadaire'),

  new SlashCommandBuilder()
    .setName('ghost')
    .setDescription('Donne un fantôme aléatoire')
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('🔄 Enregistrement des commandes...');

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );

    console.log('✅ Commandes enregistrées');
  } catch (error) {
    console.error(error);
  }
})();

client.once('ready', () => {
  console.log(`👻 Connecté en tant que ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'weekly') {
    await interaction.reply('👻 Weekly Challenge bientôt disponible.');
  }

  if (interaction.commandName === 'ghost') {
    const ghosts = ['Demon', 'Spirit', 'Oni', 'Shade', 'Revenant'];
    const ghost = ghosts[Math.floor(Math.random() * ghosts.length)];

    await interaction.reply(`👻 Fantôme : ${ghost}`);
  }
});

client.login(process.env.DISCORD_TOKEN);
