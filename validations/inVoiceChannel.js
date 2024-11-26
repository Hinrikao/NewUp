module.exports = ({ interaction, commandObj }) => {
    if (commandObj.options?.inVoice) {
        const memberChannel = interaction.member.voice.channelId;
        
        if (!memberChannel) {
            return interaction.reply({
                content: `\`❌\` | Você precisa estar em um canal de voz para usar este comando.`,
                ephemeral: true
            });
        }
    }
};