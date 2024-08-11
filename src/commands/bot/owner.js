const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    client.embed({
        title: `📘・Informations sur le propriétaire`,
        desc: `____________________________`,
        thumbnail: client.user.avatarURL({ dynamic: true, size: 1024 }),
        fields: [{
            name: "👑┆Nom du propriétaire",
            value: `n0step_`,
            inline: true,
        },
        {
            name: "🏷┆Tag Discord",
            value: `n0step_`,
            inline: true,
        },
        {
            name: "🏢┆Organisation",
            value: `CoreWare`,
            inline: true,
        },
        {
            name: "🌐┆Site web",
            value: `[https://n0step.xyz](https://n0step.xyz)`,
            inline: true,
        }],
        type: 'editreply'
    }, interaction)
}
