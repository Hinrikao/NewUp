const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { logger } = require("../../utils/logger");
const config = require("../../config");

module.exports = {
	data: new SlashCommandBuilder()
   	.setName("resume")
   	.setDescription("Retomar uma faixa pausada")
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

            if (!player.paused) {
                return interaction.reply({ 
                    embeds: [embed.setDescription("\`❗\` | O player atual não está pausado.")],  
                    ephemeral: true 
                });
            }

            player.pause(false);
            return interaction.reply({ embeds: [embed.setDescription("\`▶️\` | A reprodução foi retomada!")] });

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