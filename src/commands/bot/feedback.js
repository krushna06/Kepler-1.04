const Discord = require('discord.js');

const webhookClient = new Discord.WebhookClient({
    id: "",
    token: "",
});

module.exports = async (client, interaction, args) => {
    const feedback = interaction.options.getString('feedback');

    const embed = new Discord.EmbedBuilder()
        .setTitle(`📝・Nouveau feedback!`)
        .addFields(
            { name: "Utilisateur", value: `${interaction.user} (${interaction.user.tag})`, inline: true },
        )
        .setDescription(`${feedback}`)
        .setColor(client.config.colors.normal)
    webhookClient.send({
        username: 'Feedback du bot',
        embeds: [embed],
    });

    client.succNormal({ 
        text: `Feedback envoyé avec succès aux développeurs`,
        type: 'editreply'
    }, interaction);
}
