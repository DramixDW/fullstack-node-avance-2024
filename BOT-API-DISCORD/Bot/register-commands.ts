import { REST, Routes, SlashCommandBuilder } from "discord.js";
import { Command } from ".";

export async function registerCommands(commands: Command[]) {
    const rest = new REST().setToken(process.env.BOT_TOKEN!);

    // on construit notre tableau de commandes slash
    const slashCommands = commands.map((c) => (
        new SlashCommandBuilder()
            .setName(c.commandName)
            .setDescription(c.description)
    ));

    await rest.put(Routes.applicationCommands(process.env.APPLICATION_ID!), {
        body: slashCommands
    });
}
