const { logger } = require("../../../utils/logger");
const Reconnect = require("../../../schemas/247Connection");
const client = require("../../../Hinrikao");

client.riffy.on("nodeConnect", async (node) => {
    const guilds = client.guilds.cache;
    logger(`Conectado com sucesso ao ${node.name}`, "debug");

    for (const guild of guilds.values()) {
        const data = await Reconnect.findOne({ GuildId: guild.id });
        
        if (data) {
            const voiceChannel = guild.channels.cache.get(data.VoiceChannelId);
        
            try {
                await client.riffy.createConnection({
                    guildId: data.GuildId, 
                    voiceChannel: data.VoiceChannelId, 
                    textChannel: data.TextChannelId,
                    deaf: true
                });
            
                logger(`Reconectado ao ${voiceChannel.name} em ${guild.name}`, "warn");
            
            } catch (err) {
                logger(`Não foi possível reconectar ao canal de voz: ${err.message}`, "error");
            }
        }
    }
});