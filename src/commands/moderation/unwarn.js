const Discord = require('discord.js');

const Schema = require("../../database/models/warnings");

module.exports = async (client, interaction, args) => {
    const perms = await client.checkUserPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageMessages],
        perms: [Discord.PermissionsBitField.Flags.ManageMessages]
    }, interaction);

    if (perms == false) return;

    var member = interaction.options.getUser('user');
    var Case = interaction.options.getInteger('case');

    Schema.findOne({ Guild: interaction.guild.id, User: member.id }, async (err, data) => {
        if (data) {
            var warn = data.Warnings.find(x => x.Case == Case);
            if (!warn) {
                client.errNormal({
                    error: "Cet utilisateur n'a pas d'avertissement avec ce numéro de cas !",
                    type: 'editreply'
                }, interaction);
                return;
            }
            data.Warnings.splice(data.Warnings.indexOf(warn), 1);
            data.save();
        }
        else {
            client.errNormal({ 
                error: "L'utilisateur n'a pas d'avertissements !", 
                type: 'editreply'
            }, interaction);
        }
    })

    client.embed({
        title: `🔨・Annulation d'avertissement`,
        desc: `Vous avez été désaverti dans **${interaction.guild.name}**`,
        fields: [
            {
                name: "👤┆Modérateur",
                value: interaction.user.tag,
                inline: true
            },
        ]
    }, member).catch(() => {})

    client.emit('warnRemove', member, interaction.user)
    client.succNormal({
        text: `L'avertissement de l'utilisateur a été supprimé avec succès`,
        fields: [
            {
                name: "👤┆Utilisateur",
                value: `${member}`,
                inline: true
            }
        ],
        type: 'editreply'
    }, interaction);
}
