import { Client, GatewayIntentBits, Routes, SlashCommandBuilder } from 'discord.js';
import { REST } from 'discord.js';

async function registerCommands() {
    const rest = new REST().setToken(process.env.BOT_TOKEN!);

    await rest.put(Routes.applicationCommands(process.env.APPLICATION_ID!), {
        body: [
            new SlashCommandBuilder()
            .setName('ping')
            .setDescription('Ping me daddy')
        ]
    });
}


export async function initBot() {
    const client = new Client({ intents: [
        GatewayIntentBits.Guilds
    ] });

    await registerCommands();

    client.on('ready', () => {
        console.log("Le bot est connecté à Discord");
    });

    // lorsqu'une commande interragit avec notre bot
    client.on('interactionCreate', async (interaction) => {
        if (interaction.isCommand()) {
            if (interaction.commandName === "ping") {
                await interaction.reply({
                    content: "Pong",
                    // message lisible que par vous
                    ephemeral: true
                });
            } 
        }
    });

    await client.login(process.env.BOT_TOKEN);
}