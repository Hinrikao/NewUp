const { client_id } = require("../../../config");
const { logger } = require("../../../utils/logger");
const client = require("../../../Hinrikao");

module.exports = async () => {
    client.riffy.init(client_id)
    logger(`Eventos Riffy iniciados com sucesso`, "debug");
};