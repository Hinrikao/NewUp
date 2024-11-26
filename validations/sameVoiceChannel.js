module.exports = ({ interaction, commandObj, client }) => {
    if (commandObj.options?.sameVoice) {
        const memberChannel = interaction.member.voice.channel;
        const player = client.riffy.players.get(interaction.guildId);
        
        if (player) {
            if (player.voiceChannel !== memberChannel.id) {
                return interaction.reply({ 
                    content: "\`❌\` | Você deve estar no mesmo canal de voz que o bot.", 
                    ephemeral: true 
                });
            }
        }
    } 
};