const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { logger } = require("../../utils/logger");
const config = require("../../config");

module.exports = {
	data: new SlashCommandBuilder()
   	.setName("previous")
   	.setDescription("Tocar a faixa anterior")
    .setDMPermission(false),

    run: async ({ interaction, client }) => {
        const embed = new EmbedBuilder().setColor(config.default_color);

        try {
            const player = client.riffy.players.get(interaction.guildId);

            if (!player) {
                return interaction.reply({ 
                    embeds: [embed.setDescription("\`❌\` | Nenhum player encontrado neste servidor.")],  
                    ephemeral: true 
                });
            }

            if (!player.previous) {
                return interaction.reply({ 
                    embeds: [embed.setDescription("\`❌\` | Música anterior: \`Não encontrada\`.")], 
                    ephemeral: true 
                });
            }

            player.stop();
            return player.queue.unshift(player.previous);

        } catch (err) {
            logger(err, "error");
            return interaction.reply({ 
                embeds: [embed.setDescription(`\`❌\` | Um erro ocorreu: ${err.message}`)], 
                ephemeral: true 
            });
        }
    },
    options: {
        inVoice: true,
        sameVoice: true,
    }
};