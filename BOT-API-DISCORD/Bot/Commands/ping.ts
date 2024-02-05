import { CommandInteraction } from "discord.js";

export const commandName = "ping";
export const description = "Makes me ping";
export const enableInDM = false;

// execution de la commande
export async function execute(interaction: CommandInteraction) {
    await interaction.reply({
        content: "Pong",
        // message lisible que par vous
        ephemeral: true
    });
}