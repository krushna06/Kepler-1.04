const Discord = require('discord.js');
const isgd = require('isgd');

module.exports = async (client, interaction, args) => {

    const url = interaction.options.getString('site');
    const code = interaction.options.getString('code');

    isgd.custom(url, code, function(res) {
        if (res.startsWith("Error")) return client.errNormal({
            error: `${res.replace("Error: ", "")}`,
            type: 'editreply'
        }, interaction)

        client.succNormal({
            text: `Votre URL raccourcie a été créée !`,
            fields: [
                {
                    name: `🔗┇Lien`,
                    value: `${res}`,
                    inline: true,
                }
            ], 
            type: 'editreply'
        }, interaction);
    });
}

