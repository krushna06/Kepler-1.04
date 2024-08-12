const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const perms = await client.checkPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageMessages],
        perms: [Discord.PermissionsBitField.Flags.ManageMessages]
    }, interaction);

    if (perms == false) return;

    const amount = interaction.options.getNumber('amount');

    if (amount > 100) return client.errNormal({
        error: "Je ne peux pas supprimer plus de 100 messages à la fois !",
        type: 'editreply'
    }, interaction);

    if (amount < 1) return client.errNormal({
        error: "Je ne peux pas supprimer moins de 1 message !",
        type: 'editreply'
    }, interaction);

    interaction.channel.bulkDelete(amount + 1).then(() => {
        client.succNormal({
            text: `J'ai supprimé les messages avec succès`,
            fields: [
                {
                    name: "💬┆Nombre",
                    value: `${amount}`,
                    inline: true
                }
            ],
            type: 'ephemeraledit'
        }, interaction)
    }).catch(err => {
        client.errNormal({
            error: "Il y a eu une erreur en essayant de supprimer les messages dans ce canal !",
            type: 'editreply'
        }, interaction);
    });
}
