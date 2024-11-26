const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { logger } = require("../../utils/logger");
const config = require("../../config");


module.exports = {
	data: new SlashCommandBuilder()
   	.setName("reiniciar")
   	.setDescription("Reiniciar o processo do bot."),

    run: async ({ interaction }) => {
        const embed = new EmbedBuilder().setColor(config.default_color);
        
        try {
        await interaction.reply({ 
            embeds: [embed.setDescription("Reiniciando o bot...")],
            ephemeral: true
        });

        process.exit();

        } catch (err) {
            logger(err, "error");
            return interaction.reply({ 
                embeds: [embed.setDescription(`\`❌\` | Um erro ocorreu: ${err.message}`)], 
                ephemeral: true 
            });
        }
    },
    options: {
		devOnly: true
	}
};