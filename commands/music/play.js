const { 
	SlashCommandBuilder, 
	PermissionFlagsBits, 
	EmbedBuilder } = require("discord.js");
const { logger } = require("../../utils/logger");
const config = require("../../config");


module.exports = {
	data: new SlashCommandBuilder()
   	.setName("play")
   	.setDescription("Tocar uma música/playlist")
	.setDMPermission(false)
    .addStringOption(option => 
      	option.setName("query")
      	.setDescription("Nome da música ou URL")
		.setAutocomplete(true)
      	.setRequired(true)
    ),

	run: async ({ interaction, client }) => {
		if (!interaction.guild.members.me.permissionsIn(interaction.channel).has([PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages])) {
			return interaction.reply({ content: "\`❌\` | Bot não pode acessar o canal que você está atualmente\n\`⚠️\` | Por favor, verifique as permissões do Bot neste servidor", ephemeral: true })
		}
		if (!interaction.guild.members.me.permissionsIn(interaction.member.voice.channel.id).has([PermissionFlagsBits.ViewChannel, PermissionFlagsBits.Connect])) {
			return interaction.reply({ content: "\`❌\` | Bot não pode se conectar ao canal de voz que você está atualmente\n\`⚠️\` | Por favor, verifique as permissões do Bot neste servidor", ephemeral: true })
		}

   	await interaction.deferReply();

	const embed = new EmbedBuilder().setColor(config.default_color);

   	const query = interaction.options.getString("query");
	
	let player = client.riffy.players.get(interaction.guildId);
	
	if (!player) {
		player = client.riffy.createConnection({
			defaultVolume: 50,
			guildId: interaction.guildId,
			voiceChannel: interaction.member.voice.channelId,
			textChannel: interaction.channelId,
			deaf: true
		});
	}

   	const resolve = await client.riffy.resolve({ query: query, requester: interaction.member });
   	const { loadType, tracks, playlistInfo } = resolve;

		if (loadType === "playlist") {
			for (const track of resolve.tracks) {
				track.info.requester = interaction.member;
				player.queue.add(track);
			}

			await interaction.editReply({ embeds: [embed.setDescription(`\`➕\` | **[${playlistInfo.name}](${query})** • ${tracks.length} Faixa(s) • ${interaction.member}`)] });
			if (!player.playing && !player.paused) return player.play();

		} else if (loadType === "search" || loadType === "track") {
			const track = tracks.shift();
			
			track.info.requester = interaction.member;
			player.queue.add(track);

			await interaction.editReply({ embeds: [embed.setDescription(`\`➕\` | **[${track.info.title}](${track.info.uri})** • ${interaction.member}`)] });
			if (!player.playing && !player.paused) return player.play();

		} else {
			return interaction.editReply({ embeds: [embed.setDescription("\`❌\` | Nenhum resultado encontrado para sua pesquisa.")] });
		}
  	},

	autocomplete: async ({ interaction }) => {
		const yt = require("youtube-sr").default;
		
		if (!interaction.isAutocomplete()) return;

		if (interaction.commandName !== 'play') return;
		const focusedValue = interaction.options.getFocused();
	
		if (/^(http|https):\/\//.test(focusedValue.toLocaleLowerCase())) {
			return interaction.respond([{ name: "URL", value: focusedValue }]);
		  }
		const random = "ytsearch"[Math.floor(Math.random() * "ytsearch".length)];
		const results = await yt.search(focusedValue || random, { safeSearch: false, limit: 15 });
	
		const choices = [];
		for (const video of results) {
			choices.push({ name: video.title, value: video.url });
		}
	
		const filteredChoices = choices.filter((m) =>
			m.name.toLocaleLowerCase().includes(focusedValue.toLocaleLowerCase())
		);
	
		const result = filteredChoices.map((choice) =>{
			return {
				name: choice.name,
				value: choice.value
			}
		});
		interaction.respond(result.slice(0, 15)).catch(() => {});
	},
	options: {
		inVoice: true,
		sameVoice: true,
	}
};