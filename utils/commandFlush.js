const { REST } = require("@discordjs/rest");
const { client_token, client_id } = require("../config");
const { Routes } = require("discord-api-types/v10");

(async () => {
    const rest = new REST({ version: "10" }).setToken(client_token);

        console.log("Bot começou a deletar comandos...");
        await rest.put( Routes.applicationCommands(client_id), { body: [] });
        console.log("Concluído");
})();