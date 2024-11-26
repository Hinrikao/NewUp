const { 
    Client, 
    GatewayIntentBits, 
    GatewayDispatchEvents } = require("discord.js");
const { readdirSync } = require("fs");
const { CommandKit } = require("commandkit");
const { Spotify } = require("riffy-spotify");
const { connect } = require("mongoose")
const { logger } = require("./utils/logger")
const { Riffy } = require("riffy");
const config = require("./config");
const path = require("path");

// CRIANDO CLIENTE DISCORD
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ],
});

// CRIANDO MANIPULADOR DE COMANDOS E EVENTOS (COMMANDKIT)
new CommandKit({
    client,
    commandsPath: path.join(__dirname, "commands"),
    eventsPath: path.join(__dirname, "./events/botEvents"),
    validationsPath: path.join(__dirname, "validations"),
    devGuildIds: config.developer_guild,
    devUserIds: config.developer_id,
    bulkRegister: false,
});

// CRIANDO CLIENTE RIFFY
const spotify = new Spotify({
    clientId: config.spotify.ClientId,
    clientSecret: config.spotify.ClientSecret
});

client.riffy = new Riffy(client, config.nodes, {
    send: (payload) => {
        const guild = client.guilds.cache.get(payload.d.guild_id);
        if (guild) guild.shard.send(payload);
    },
    defaultSearchPlatform: config.defaultSearchPlatform,
    reconnectTries: 15,
    restVersion: "v4",
    plugin: [spotify]
});
module.exports = client;

// FAZER LOGIN NO BOT
client.login(config.client_token);
client.on("raw", (d) => {
    if (![GatewayDispatchEvents.VoiceStateUpdate, GatewayDispatchEvents.VoiceServerUpdate,].includes(d.t)) return;
    client.riffy.updateVoiceState(d);
});

client.on("ready", () => {
    const { presence } = config;
    client.user.setPresence({
        status: presence.status,
        activities: presence.activities.map(activity => ({
            name: activity.name.replace(/{(\w+)}/g, (_, key) => activity.data(client)[key]),
            type: activity.type
        }))
    });
});

(async () => {
    await load_riffy()
    await load_db()
})()

// FUNÇÃO PARA CARREGAR MONGODB 
async function load_db() {
    await connect(config.mongodb_url)
    .then(() => {
        logger(`Conectado com sucesso ao MongoDB!`, "debug");
    })
}

// FUNÇÃO PARA INICIAR CLIENTE RIFFY
async function load_riffy() {
    logger("Iniciando Eventos Riffy", "warn")

    readdirSync('./events/riffyEvents').forEach(async dir => {
        const lavalink = readdirSync(`./events/riffyEvents/${dir}`).filter(file => file.endsWith('.js'));

        for (let file of lavalink) {
            try {
                let pull = require(`./events/riffyEvents/${dir}/${file}`);

                if (pull.name && typeof pull.name !== 'string') {
                    logger(`Não foi possível carregar o evento riffy ${file}, erro: A propriedade do evento deve ser string.`, "error")
                    continue;
                }
            } catch (err) {
                logger(`Não foi possível carregar o evento riffy ${file}, erro: ${err}`, "error")
                logger(err, "error")
                continue;
            }
        }
    });
};