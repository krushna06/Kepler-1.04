const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {

    const code = interaction.options.getString('code');

    if (isNaN(parseInt(code))) return client.errNormal({
        error: `Vous ne pouvez décoder que du code binaire !`,
        type: 'editreply'
    }, interaction);

    let decode = code.split(' ')
        .map(bin => String.fromCharCode(parseInt(bin, 2)))
        .join('');

    client.embed({
        title: `${client.emotes.normal.check}・Succès !`,
        desc: `J'ai décodé le code`,
        fields: [
            {
                name: "📥 - Entrée",
                value: `\`\`\`${code}\`\`\``,
                inline: false,
            },
            {
                name: "📥 - Sortie",
                value: `\`\`\`${decode}\`\`\``,
                inline: false,
            },
        ],
        type: 'editreply'
    }, interaction)

}

