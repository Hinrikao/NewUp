const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { logger } = require("../../utils/logger");
const config = require("../../config");

module.exports = {
	data: new SlashCommandBuilder()
   	.setName("volume")
   	.setDescription("Definir o volume do player")
    .setDMPermission(false)
    .addIntegerOption(option =>
        option.setName("value")
        .setDescription("Volume do player ( 1 - 100 )")
        .setRequired(true)
    ),

    run: async ({ interaction, client }) => {
        const embed = new EmbedBuilder().setColor(config.default_color);

        try {
            const player = client.riffy.players.get(interaction.guildId);
            const volume = interaction.options.getInteger('value');

            if (!player) {
                return interaction.reply({ 
                    embeds: [embed.setDescription("\`❌\` | Nenhum player encontrado neste servidor.")],  
                    ephemeral: true 
                });
            }

            if (volume < 0 || volume > 100) {
                return interaction.reply({ 
                    embeds: [embed.setDescription("\`❌\` | O nível do volume deve estar entre 0 e 150.")], 
                    ephemeral: true 
                });
            }

            player.setVolume(volume);
            return interaction.reply({ embed: [embed.setDescription(`\`🔊\` | Volume definido para ${volume}%`)] });

        } catch (err) {
            logger(err, "error");
            return interaction.reply({ 
                embeds: [embed.setDescription(`\`❌\` | Ocorreu um erro: ${err.message}`)], 
                ephemeral: true 
            });
        }
    },
    options: {
        inVoice: true,
        sameVoice: true,
    }
};