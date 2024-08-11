const Discord = require('discord.js');

const Schema = require("../../database/models/stats");

module.exports = async (client, interaction, args) => {
    const perms = await client.checkUserPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageChannels],
        perms: [Discord.PermissionsBitField.Flags.ManageChannels]
    }, interaction)

    if (perms == false) return;

    const name = interaction.options.getString('name');

    if (name.toUpperCase() == "HELP") {
        return client.embed({
            title: `ℹ️・Options du nom de canal`,
            desc: `Voici les options pour le nom de canal : \n
            \`{emoji}\` - Émoji du canal
            \`{name}\` - Nom du canal`,
            type: 'editreply'
        }, interaction)
    }

    Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
        if (data) {
            data.ChannelTemplate = name
            data.save();
        }
        else {
            new Schema({
                Guild: interaction.guild.id,
                ChannelTemplate: name
            }).save();
        }

        client.succNormal({
            text: `Le nom du canal a été défini avec succès`,
            fields: [
                {
                    name: `💬┆Nom`,
                    value: `${name}`,
                    inline: true
                },
            ],
            type: 'editreply'
        }, interaction)
    })
}
