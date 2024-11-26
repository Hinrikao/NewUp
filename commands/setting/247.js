const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { logger } = require("../../utils/logger.js");
const Reconnect = require("../../schemas/247Connection");
const config = require("../../config");

module.exports = {
	data: new SlashCommandBuilder()
   		.setName("247")
   		.setDescription("Definir a sessão atual do player para 24/7")
   		.setDMPermission(false),

	run: async ({ client, interaction }) => {
		const embed = new EmbedBuilder().setColor(config.default_color);

		try {
			await interaction.deferReply({ ephemeral: false });
			const player = client.riffy.players.get(interaction.guildId);
			const data = await Reconnect.findOne({ GuildId: interaction.guildId });

			if (data) {
				await data.deleteOne();
				return interaction.editReply({ embeds: [embed.setDescription("\`📻\` | Modo 247 foi: \`Desativado\`")] });
			} else if (!data) {
				const newData = await Reconnect.create({
					GuildId: interaction.guildId,
					TextChannelId: player.textChannel,
					VoiceChannelId: player.voiceChannel,
				});

				await newData.save();
				return interaction.editReply({ embeds: [embed.setDescription("\`📻\` | Modo 247 foi: \`Ativado\`")] });
			}
		} catch (err) {
			logger(err, "error");
			return interaction.editReply({ content: `\`❌\` | Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.`, ephemeral: true });
		}
	},
	options: {
		inVoice: true,
		sameVoice: true,
	}
};