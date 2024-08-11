const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    client.embed({
        title: "📃・Journal des modifications",
        desc: `_____`,
        thumbnail: client.user.avatarURL({ size: 1024 }),
        fields: [{
            name: "📃┆Journal des modifications",
                value: '15/3/2023 Mises à jour des dépendances',
                inline: false,
            },
        ],
        type: 'editreply'
    }, interaction)
}
