const { logger } = require("../../../utils/logger");
const Reconnect = require("../../../schemas/247Connection");
const client = require("../../../Hinrikao");

client.riffy.on("playerDisconnect", async (player) => {
    const data = await Reconnect.findOne({ TextChannelId: player.textChannel });
    logger(`Um player foi destruído em (${player.guildId})`, "warn");

    setTimeout( async () => {
        const playerExist = client.riffy.players.get(player.guildId);

        if (data && !playerExist) {
            await client.riffy.createConnection({
                guildId: data.GuildId, 
                voiceChannel: data.VoiceChannelId, 
                textChannel: data.TextChannelId,
                deaf: true
            });
        }
    }, 500);
});