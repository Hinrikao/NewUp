const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { logger } = require("../../utils/logger");

module.exports = {
	data: new SlashCommandBuilder()
   	.setName("autoplay")
   	.setDescription("Define a reprodução automática para a fila atual do player")
    .setDMPermission(false),

    run: async ({ interaction, client }) => {
        try {
            const player = client.riffy.players.get(interaction.guildId);

            if (!player) {
                return interaction.reply({ 
                    embeds: [embed.setDescription("\`❌\` | Nenhum player encontrado neste servidor.")],  
                    ephemeral: true 
                });
            }

            if (player.isAutoplay === false) {

                const embed = new EmbedBuilder().setDescription(`♾ | Reprodução automática foi ativada`).setColor("Blurple");
        
                await interaction.reply({ embeds: [embed], ephemeral: true });
                player.isAutoplay = true;
            } else if (player.isAutoplay === true) {

                const embed = new EmbedBuilder().setDescription(`♾ | Reprodução automática foi desativada`).setColor("Blurple");
        
                await interaction.reply({ embeds: [embed], ephemeral: true });
                player.isAutoplay = false;
            }

        } catch (err) {
            logger(err, "error");
            return interaction.reply({ content: `\`❌\` | Um erro ocorreu: ${err.message}`,  ephemeral: true });
        }
    },
	options: {
		inVoice: true,
		sameVoice: true,
	}
};