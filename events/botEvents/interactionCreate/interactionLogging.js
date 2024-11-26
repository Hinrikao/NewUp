const { logger } = require("../../../utils/logger");

module.exports = async (interaction) => { 
    if (interaction.isAutocomplete() || interaction.isButton()) return;
    logger(`/${interaction.commandName} usado por ${interaction.user.tag} em ${interaction.guild} (${interaction.guildId})`, "info");
};