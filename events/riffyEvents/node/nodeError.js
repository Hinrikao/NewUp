const { logger } = require("../../../utils/logger");
const client = require("../../../Hinrikao");

client.riffy.on("nodeError", async (node, error) => {
	logger(`${node.name} encontrou um erro: ${error.message}`, "error");
});