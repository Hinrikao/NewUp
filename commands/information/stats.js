const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { logger } = require("../../utils/logger");
const config = require("../../config");
const fetch = require("node-fetch");
const moment = require('moment');
require("moment-duration-format");
const os = require("os");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("stats")
        .setDescription("Verificar as informações de estatísticas do bot")
        .setDMPermission(true),

    run: async ({ interaction, client }) => {
        try {
            let nodes= "";

            client.riffy.nodes.forEach((node) => {
                const lavalinkNode = client.riffy.nodeMap.get(node.name);
                const lavalinkMemory = (lavalinkNode.stats.memory.used / 1024 / 1024).toFixed(2);

                const lavalinkUptime = moment
                    .duration(lavalinkNode.stats.uptime)
                    .format("d[ Dias]・h[ Hrs]・m[ Mins]・s[ Segs]");
    
                nodes += `\`\`\`yml\nNode: ${node.name}\nTempo Online: ${lavalinkUptime}\nMemória: ${lavalinkMemory} MB\nJogadores: ${lavalinkNode.stats.playingPlayers} de ${lavalinkNode.stats.players}\nCliente Lavalink: Riffy\`\`\`\n`;
            });

            const osVersion = os.platform() + " " + os.release();
            const nodeVersion =  process.version;

            const systemUptime = moment
			.duration(os.uptime() * 1000)
			.format("d[ Dias]・h[ Hrs]・m[ Mins]・s[ Segs]");

            const startTime = Date.now();
            await fetch("https://discord.com/api/v10/gateway");
            const apiPing = Date.now() - startTime;

            const embed = new EmbedBuilder()
                .setColor(config.default_color)
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 2048 }))
                .setTitle(`Informações do ${client.user.username}`)
                .setDescription(`\`\`\`yml\nNome: ${client.user.username} (${client.user.id})\nLatência do Websocket: ${client.ws.ping}ms\nLatência da API: ${apiPing}ms\n\`\`\``)
                .setFields([
                    {
                        name: `Estatísticas do Lavalink`,
                        value: nodes,
                        inline: false,
                    },
                    {
                        name: "Estatísticas do Bot",
                        value: `\`\`\`yml\nServidores: ${
                            client.guilds.cache.size
                        } \nNodeJS: ${nodeVersion}\`\`\``,
                        inline: true,
                    },
                    {
                        name: "Estatísticas do Sistema",
                        value: `\`\`\`yml\nSO: ${osVersion}\nTempo Online: ${systemUptime}\n\`\`\``,
                        inline: false,
                    },
                ])
                .setFooter({ text: "Comunidade Hinrikao ❤️" })

            return interaction.reply({
                embeds: [embed]
            })
        } catch (err) {
            const embed = new EmbedBuilder().setColor(config.default_color);

            logger(err, "error");
            return interaction.reply({ 
                embeds: [embed.setDescription(`\`❌\` | Ocorreu um erro: ${err.message}`)], 
                ephemeral: true 
            });
        }
    }
};