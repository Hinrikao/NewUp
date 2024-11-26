const { logger } = require("../../../utils/logger");
const client = require("../../../Hinrikao");

client.riffy.on("playerCreate", async (player) => {
    logger(`Um player selvagem foi criado em (${player.guildId})`, "warn");
});