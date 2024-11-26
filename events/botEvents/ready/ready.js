const { logger } = require("../../../utils/logger");
const { ActivityType } = require("discord.js");
const { capitalize, format } = require("../../../utils/string");
const config = require("../../../config");
const colors = require("colors");

module.exports = (client) => {
	logger(`Login realizado com sucesso como ${colors.rainbow(`[${client.user.tag}]`)}`, "debug");

	const activities = config.presence.activities;
	client.user.setStatus(config.presence.status);

	let currentActivityIndex = 0;

	setInterval(() => {
		const activity = activities[currentActivityIndex];
		let data = {};
		try {
			data = activity.data(client);
		} catch (err) {}

		client.user.setActivity({
			name: format(activity.name, data),
			type: ActivityType[capitalize(activity.type)],
		});

		currentActivityIndex = (currentActivityIndex + 1) % activities.length;
	}, 30000);

	setInterval(() => {
		const activity = activities[currentActivityIndex];
		let data = {};
		try {
			data = activity.data(client);
		} catch (err) {}

		client.user.setActivity({
			name: format(activity.name, data),
			type: ActivityType[capitalize(activity.type)],
		});
	}, 5000);
};