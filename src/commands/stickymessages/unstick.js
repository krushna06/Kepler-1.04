const Discord = require('discord.js');

const Schema = require("../../database/models/stickymessages");

module.exports = async (client, interaction, args) => {
    const channel = interaction.options.getChannel('channel');

    Schema.findOne({ Guild: interaction.guild.id, Channel: channel.id }, async (err, data) => {
        if (data) {
            Schema.findOneAndDelete({ Guild: interaction.guild.id, Channel: channel.id }).then(() => {
                client.succNormal({
                    text: "Message épinglé supprimé",
                    fields: [
                        {
                            name: `📘┆Canal`,
                            value: `${channel}`
                        }
                    ],
                    type: 'editreply'
                }, interaction);
            })
        }
        else {
            client.errNormal({
                error: 'Aucun message trouvé !',
                type: 'editreply'
            }, interaction)
        }
    })
}
