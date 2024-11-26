const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { logger } = require("../../utils/logger");
const config = require("../../config");

module.exports = {
	data: new SlashCommandBuilder()
   	.setName("stop")
   	.setDescription("Parar a faixa atual e destruir o player")
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

            player.stop();
            player.destroy();
            return interaction.reply({ embeds: [embed.setDescription("\`⏹️\` Player foi parado e destruído.")] });

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