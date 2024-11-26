const { logger } = require("../../../utils/logger");
const client = require("../../../Hinrikao");

client.riffy.on("trackEnd", async (player) => {
    if (!player) return;

    if (player.message) await player.message.delete().catch((e) => {});
});