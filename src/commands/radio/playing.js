const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    client.embed({
        title: `📻・Informations sur la Radio`,
        desc: `Toutes les infos sur la radio dans ce serveur`,
        fields: [{
            name: "👤┆Auditeurs du Canal",
            value: `${interaction.member.voice.channel.members.size} auditeurs`,
            inline: true
        },
        {
            name: "📺┆Canal Connecté",
            value: `${interaction.member.voice.channel} (${interaction.member.voice.channel.name})`,
            inline: true
        },
        {
            name: "🎶┆Station de Radio",
            value: `[Radio 538](https://www.538.nl/)`,
            inline: true
        },
        ],
       type: 'editreply'
    }, interaction)
}
