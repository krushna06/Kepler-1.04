const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    let row = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.ButtonBuilder()
                .setLabel("GitHub")
                .setURL("https://github.com/krushna06")
                .setStyle(Discord.ButtonStyle.Link),
        );

    client.embed({
        title: `${client.user.username}・Faire un don`,
        desc: '_____ \n\nCliquez sur le bouton ci-dessous pour accéder à la page du sponsor \n**Attention ! Le parrainage n\'est pas obligatoire**',
        thumbnail: client.user.avatarURL({ dynamic: true }),
        url: "https://paypal.me/krushna06",
        components: [row],
        type: 'editreply'
    }, interaction)
}
