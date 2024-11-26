const { logger } = require("../../../utils/logger");
const client = require("../../../Hinrikao");

client.riffy.on("trackError", async (payload) => {
    logger(payload, "error");
});