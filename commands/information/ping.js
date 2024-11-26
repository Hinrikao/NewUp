const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { logger } = require("../../utils/logger");
const config = require("../../config");
const fetch = require("node-fetch");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Verificar a latência do bot")
        .setDMPermission(true),

    run: async ({ interaction, client }) => {
        const embed = new EmbedBuilder().setColor(config.default_color);

        try {
            const wsPing = client.ws.ping;

            const startTime = Date.now();
            await fetch("https://discord.com/api/v10/gateway");
            const apiPing = Date.now() - startTime;

            return interaction.reply({ embeds: [embed.setDescription(`Pong! 🏓 Latência do WebSocket: ${wsPing}ms | Latência da API do Discord: ${apiPing}ms`)] });

        } catch (err) {
            logger(err, "error");
            return interaction.reply({ 
                embeds: [embed.setDescription(`\`❌\` | Um erro ocorreu: ${err.message}`)], 
                ephemeral: true 
            });
        }
    }
};