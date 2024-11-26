require("dotenv").config();

/* 
 * PREENCHA TODAS AS INFORMAÇÕES NECESSÁRIAS
 * POR FAVOR, PELO AMOR DE DEUS, NÃO COMPARTILHE SUAS CHAVES DE API
 * E TAMBÉM PREENCHA TODAS AS INFORMAÇÕES ANTES DE PEDIR AJUDA NO SERVIDOR DE SUPORTE
 */

const JOGANDO = "PLAYING";
const ASSISTINDO = "WATCHING";
const ONLINE = "online";
const AUSENTE = "idle";
const OCUPADO = "dnd";
const INVISIVEL = "invisible";

module.exports = {

    /**
     * Token do Cliente | Usado para fazer login no bot
     */
    client_token: process.env.CLIENT_TOKEN || "",
    /**
     * ID do Cliente | Usado para verificar informações do bot e afins
     */
    client_id: process.env.CLIENT_ID || "",
    /**
     * Cor padrão | A cor padrão dos embeds do bot
     */
    default_color: process.env.DEFAULT_COLOR || "",
    /**
     * URL do Mongo | A URL do mongodb para armazenar informações do banco de dados
     */
    mongodb_url: process.env.MONGO_URI || "",
    /**
     * Desenvolvedor | O ID do desenvolvedor do bot para usar comando exclusivo de dev
     */
    developer_id: [process.env.DEV_ID] || [''],
    /**
     * Guilda do desenvolvedor | O ID da guilda de desenvolvimento do bot para usar comando exclusivo de dev
     */
    developer_guild: [process.env.DEV_GUILD] || [''],
    /**
     * Plataforma de pesquisa padrão | A plataforma de pesquisa padrão do recurso de música (Pode ser spsearch, ytsearch, ytmsearch, scsearch)
     */
    defaultSearchPlatform: process.env.DEFAULT_SEARCH_PLATFORM || "spsearch",

    /**
     * As informações dos nós lavalink
     * Verifique o servidor lavalink disponível em https://deployments.beban.tech
     */
    nodes: [
        {
            name: "Lavalink", // Não altere o nome do nó se você não souber o que está fazendo
            host: "lava-v4.beban.tech", // O hostname do servidor lavalink
            port: 80,  // A porta do servidor lavalink
            password: "bytebee_", // A senha do servidor lavalink
            secure: false, // O servidor lavalink usa conexão segura
            autoResume: true // Apenas mantenha isso como verdadeiro
        },
    ],

    /**
     * As informações do cliente spotify para o plugin de fonte spotify
     */
    spotify: {
        ClientId: process.env.SPOTIFY_CLIENTID || "",
        ClientSecret: process.env.SPOTIFY_SECRET || ""
    },

    /**
     * A configuração de presença do bot
     */
    presence: {
        /**
         * online (disponível), idle (ausente), dnd (ocupado), invisible (invisível), ...
         */
        status: ONLINE,
        activities: [
            {
                name: "{Guilds} servidores",
                type: ASSISTINDO,
                data: (client) => {
                    return {
                        Guilds: client.guilds.cache.size,
                    };
                },
                update: true,
            },
            {
                name: "Ping: {Ping}ms",
                type: ASSISTINDO,
                data: (client) => {
                    return {
                        Ping: client.ws.ping,
                    };
                },
                update: true,
            },
            // {
            //     name: "Servindo {Users} usuários",
            //     type: JOGANDO,
            //     data: (client) => {
            //         return {
            //             Users: client.users.cache.size,
            //         };
            //     },
            // },
        ],
    },
}

