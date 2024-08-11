const Discord = require('discord.js');
const Schema = require("../../database/models/music");

module.exports = async (client, interaction, args) => {
    const webhookClientLogs = new Discord.WebhookClient({
        id: client.webhooks.voiceLogs.id,
        token: client.webhooks.voiceLogs.token,
    });

    let channel = interaction.member.voice ? interaction.member.voice.channel : null;
    if (!channel) return client.errNormal({ error: `Le canal n'existe pas !`, type: 'editreply' }, interaction);

    client.radioStop(channel);

    var remove = await Schema.deleteOne({ Guild: interaction.guild.id });

    client.embed({
        title: `📻・Radio arrêtée`,
        desc: `La radio a été arrêtée avec succès \nPour faire rejoindre le bot, utilisez : \`rplay\``,
        fields: [{
            name: "👤┆Arrêtée Par",
            value: `${interaction.user} (${interaction.user.tag})`,
            inline: true
        },
        {
            name: "📺┆Canal",
            value: `${channel} (${channel.name})`,
            inline: true
        }
        ],
        type: 'editreply'
    }, interaction)

    let embed = new Discord.EmbedBuilder()
        .setTitle(`📻・Radio arrêtée`)
        .setDescription(`_______________ \n\nLa radio a été arrêtée avec succès`)
        .addFields(
            { name: "👤┆Arrêtée Par", value: `${interaction.user} (${interaction.user.tag})`, inline: true },
            { name: "📺┆Canal", value: `${channel} (${channel.name})`, inline: true },
            { name: "⚙️┆Serveur", value: `${interaction.guild.name} (${interaction.guild.id})`, inline: true },
        )
        .setColor(client.config.colors.normal)
        .setTimestamp();
    webhookClientLogs.send({
        username: 'Logs du Bot',
        embeds: [embed],
    });
}
