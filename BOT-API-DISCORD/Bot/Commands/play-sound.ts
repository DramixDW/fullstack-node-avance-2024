import { NoSubscriberBehavior, createAudioPlayer, createAudioResource, joinVoiceChannel } from "@discordjs/voice";
import { ApplicationCommandOptionType, CommandInteraction, GuildMember, SlashCommandBuilder } from "discord.js";
import { createReadStream } from "fs";
import { join } from "path";
import { setTimeout } from "timers/promises";

export const commandName = "play";

export const builder = (builder: SlashCommandBuilder) => {
    return builder.setDescription('Joue un son')
        .addStringOption((o) => {
            return o
                .setName('sound')
                .setDescription('Le nom du son')
                .setRequired(true)
        })
}

// execution de la commande
export async function execute(interaction: CommandInteraction) {
    const channel = (interaction.member as GuildMember).voice;
    const channelId = channel.channelId;
    const guildId = interaction.guildId;

    // on récupère l'argument
    console.log(interaction.options.get('sound'))

    if (!channelId || !guildId) {
        return interaction.reply("Veuillez-vous connecter dans un channel pour cette commande");
    }

    const voice = joinVoiceChannel({
        channelId,
        guildId,
        adapterCreator: channel.guild.voiceAdapterCreator,
        selfDeaf: false,
        selfMute: false
    });

    const audioPlayer = createAudioPlayer({
        behaviors: {
            noSubscriber: NoSubscriberBehavior.Pause,
        },
    });

    audioPlayer.on('error', error => {
        console.error(`Error: ${error.message} with resource ${error.resource.metadata}`);
    });

    // ressource audio à jouer
    const audioResource = createAudioResource(createReadStream(join(process.cwd(), 'uploads' , 'discord-notification-1706786962726.mp3')));

    audioResource.playStream.on("error", (e) => {
        console.log("Une erreur est survenue", e);
    });

    // on set le volume à 50%
    audioResource.volume?.setVolume(0.5);

    // dit au son d'être joué
    audioPlayer.play(
        audioResource
    );

    // on dit à la voix du bot d'écouter les sons à jouer de l'audioPlayer
    voice.subscribe(audioPlayer);
    
    await interaction.reply({
        content: ':middle_finger:',
        ephemeral: true
    });
    await setTimeout(1000);
    await interaction.deleteReply();
}