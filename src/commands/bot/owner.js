const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    client.embed({
        title: `📘・Owner information`,
        desc: `____________________________`,
        thumbnail: client.user.avatarURL({ dynamic: true, size: 1024 }),
        fields: [{
            name: "👑┆Owner name",
            value: `n0step_`,
            inline: true,
        },
        {
            name: "🏷┆Discord tag",
            value: `n0step_`,
            inline: true,
        },
        {
            name: "🏢┆Organization",
            value: `CoreWare`,
            inline: true,
        },
        {
            name: "🌐┆Website",
            value: `[https://n0step.xyz](https://n0step.xyz)`,
            inline: true,
        }],
        type: 'editreply'
    }, interaction)
}

 