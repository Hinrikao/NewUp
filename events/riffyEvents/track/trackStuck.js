const { logger } = require("../../../utils/logger");
const client = require("../../../Hinrikao");

client.riffy.on("trackStuck", async (payload, player) => {
    logger(payload, "error");
    player.stop();
});