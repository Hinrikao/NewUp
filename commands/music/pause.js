const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { logger } = require("../../utils/logger");
const config = require("../../config");

module.exports = {
	data: new SlashCommandBuilder()
   	.setName("pause")
   	.setDescription("Pausar a faixa atual")
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

            if (player.paused) {
                return interaction.reply({ 
                    embeds: [embed.setDescription("\`❗\` | O player já está pausado.")],  
                    ephemeral: true 
                });
            }

            player.pause(true);
            return interaction.reply({ 
                embeds: [embed.setDescription("\`⏸\` | Pausou a faixa atual.")],  
                ephemeral: true 
            });
            
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