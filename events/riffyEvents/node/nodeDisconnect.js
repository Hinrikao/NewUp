const { logger } = require("../../../utils/logger");
const client = require("../../../Hinrikao");

client.riffy.on("nodeDisconnect", async (node, reason) => {
	logger(`${node.name} foi desconectado, motivo: ${JSON.stringify(reason)}`, "error");
});