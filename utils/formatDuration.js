const { convertTime } = require("./convertTime");

module.exports = (duration) => {
    if (isNaN(duration) || typeof duration === "undefined") return "00:00";
    if (duration > 3600000000) return "Ao vivo";
    return convertTime(duration, true);
};