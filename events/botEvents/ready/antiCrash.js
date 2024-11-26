const { logger } = require("../../../utils/logger");

module.exports = async () => {
    process.on("unhandledRejection", async (reason, promise) => {
        console.log("[AntiCrash] | [UnhandledRejection_Logs] | [INÍCIO] :");
        console.log("Rejeição não tratada em:", promise);
        console.log("razão:", reason);
        console.log("[AntiCrash] | [UnhandledRejection_Logs] | [FIM] :");
    });

    process.on("uncaughtException", async (err, origin) => {
        console.log("[AntiCrash] | [UncaughtException_Logs] | [INÍCIO] :");
        console.log(`Exceção não capturada: ${err}`);
        console.log(`Origem da exceção: ${origin}`);
        console.log("[AntiCrash] | [UncaughtException_Logs] | [FIM] :");
    });

    process.on("uncaughtExceptionMonitor", async (err, origin) => {
        console.log("[AntiCrash] | [UncaughtExceptionMonitor_Logs] | [INÍCIO] :");
        console.log(`Monitor de exceção não capturada: ${err}`);
        console.log(`Origem da exceção: ${origin}`);
        console.log("[AntiCrash] | [UncaughtExceptionMonitor_Logs] | [FIM] :");
    });

    logger("Eventos AntiCrash Carregados!");
};