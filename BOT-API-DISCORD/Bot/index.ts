import { Client, GatewayIntentBits } from 'discord.js';

export async function initBot() {
    const client = new Client({ intents: [
        GatewayIntentBits.Guilds
    ] });
    
    client.on('ready', () => {
        console.log("Le bot est connecté à Discord");
    });

    await client.login(process.env.BOT_TOKEN);
}