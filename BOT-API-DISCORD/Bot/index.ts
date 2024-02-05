import { Client, GatewayIntentBits, Routes, SlashCommandBuilder } from 'discord.js';
import { REST } from 'discord.js';
import { readdir } from 'fs/promises';

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

    const commands = [];

    const commandFiles = await readdir(__dirname + "/Commands");

    for (const file of commandFiles) {
        const imp = await import(`${__dirname}/Commands/${file}`);

        console.log(imp);
        
    }
    

    await registerCommands();

    client.on('ready', () => {
        console.log("Le bot est connecté à Discord");
    });

    // lorsqu'une commande interragit avec notre bot
    client.on('interactionCreate', async (interaction) => {
        if (interaction.isCommand()) {
            
        }
    });

    await client.login(process.env.BOT_TOKEN);
}