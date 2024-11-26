const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { logger } = require("../../utils/logger");
const config = require("../../config");

module.exports = {
	data: new SlashCommandBuilder()
   	.setName("filtro")
   	.setDescription("Aplicar um filtro de áudio ao player atual")
    .setDMPermission(false)
    .addStringOption(option =>
        option.setName("option")
        .setDescription("O filtro que você deseja aplicar")
        .setRequired(true)
        .addChoices(
            { name: 'Limpar/Desativar', value: 'clear' },
            { name: 'Karaoke', value: 'karaoke' },
            { name: 'Timescale', value: 'timescale' },
            { name: 'Tremolo', value: 'tremolo' },
            { name: 'Vibrato', value: 'vibrato' },
            { name: 'Rotação', value: 'rotation' },
            { name: 'Distorção', value: 'distortion' },
            { name: 'Mix de Canais', value: 'channelMix' },
            { name: 'Passa Baixa', value: 'lowPass' },
            { name: 'Reforço de Graves', value: 'bassboost' },
            { name: 'Modo Lento', value: 'slowmode' },
            { name: 'Nightcore', value: 'nightcore' },
            { name: 'Vaporwave', value: 'vaporwave' },
            { name: '8D', value: '8d' },
        )
    ),

    run: async ({ interaction, client }) => {
        const embed = new EmbedBuilder().setColor(config.default_color);
        const filterOption = interaction.options.getString("option");

        try {
            const player = client.riffy.players.get(interaction.guildId);

            if (!player) {
                return interaction.reply({ 
                    embeds: [embed.setDescription("\`❌\` | Nenhum player encontrado neste servidor.")],  
                    ephemeral: true 
                });
            }

            switch (filterOption) {
                case 'clear':
                    player.filters.clearFilters();
                    return interaction.reply({ 
                        embeds: [embed.setDescription("\`🎵\` | Todos os filtros foram limpos.")],  
                        ephemeral: true 
                    });
                case 'karaoke':
                    player.filters.setKaraoke(true);
                    break;
                case 'timescale':
                    player.filters.setTimescale(true);
                    break;
                case 'tremolo':
                    player.filters.setTremolo(true);
                    break;
                case 'vibrato':
                    player.filters.setVibrato(true);
                    break;
                case 'rotation':
                    player.filters.setRotation(true);
                    break;
                case 'distortion':
                    player.filters.setDistortion(true);
                    break;
                case 'channelMix':
                    player.filters.setChannelMix(true);
                    break;
                case 'lowPass':
                    player.filters.setLowPass(true);
                    break;
                case 'bassboost':
                    player.filters.setBassboost(true);
                    break;
                case 'slowmode':
                    player.filters.setSlowmode(true);
                    break;
                case 'nightcore':
                    player.filters.setNightcore(true);
                    break;
                case 'vaporwave':
                    player.filters.setVaporwave(true);
                    break;
                case '8d':
                    player.filters.set8D(true);
                    break;
                default:
                    return interaction.reply({ 
                        embeds: [embed.setDescription("\`❌\` | Opção de filtro inválida.")],  
                        ephemeral: true 
                    });
            }

            return interaction.reply({ 
                embeds: [embed.setDescription(`\`🎵\` | Filtro ${filterOption.charAt(0).toUpperCase() + filterOption.slice(1)} foi aplicado.`)],  
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