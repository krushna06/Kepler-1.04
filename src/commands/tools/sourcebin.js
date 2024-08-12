const Discord = require('discord.js');
const sourcebin = require('sourcebin');

module.exports = async (client, interaction, args) => {

    const language = interaction.options.getString('language');
    const code = interaction.options.getString('code');

    const bin = await sourcebin.create(
        [
            {
                content: `${code}`,
                language: `${language}`,
            },
        ],
        {
            title: '💻・Code aléatoire',
            description: 'Ce code a été téléchargé via le Bot',
        },
    ).then(value => {
        client.succNormal({
            text: `Votre code a été publié !`,
            fields: [
                {
                    name: `🔗┇Lien`,
                    value: `[Cliquez ici pour voir votre code](${value.url})`,
                    inline: true,
                }
            ],
            type: 'editreply'
        }, interaction);
    })

}

